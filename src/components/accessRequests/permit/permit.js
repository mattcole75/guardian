import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import QRCode from "react-qr-code";
import { Margin, usePDF } from "react-to-pdf";

import { userGetAccessRequest } from "../../../store/actions/index";
import Spinner from "../../ui/spinner/spinner";
import Backdrop from "../../ui/backdrop/backdropDark";
import logo from "../../../assets/kam.webp";

const Permit = () => {
    const { uid } = useParams();
    const dispatch = useDispatch();

    const [showPermit, setShowPermit] = useState(false);
    const [validPermit, setValidPermit] = useState(null);

    const { loading, error, accessRequest } = useSelector(
        (state) => state.accessRequest
    );
    const { idToken, localId } = useSelector((state) => state.auth);

    const onGetAccessRequest = useCallback(
        (idToken, localId, uid, identifier) =>
            dispatch(userGetAccessRequest(idToken, localId, uid, identifier)),
        [dispatch]
    );

    useEffect(() => {
        onGetAccessRequest(idToken, localId, uid, "GET_ACCESS_REQUEST_PERMIT");
    }, [uid, idToken, localId, onGetAccessRequest]);

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        accessRequest?.permit.map((permit, index) => {
            if (permit.date === new Date().toISOString().slice(0, 10)) {
                console.log(permit);
                setShowPermit(true);
                setValidPermit(permit);
            }
        });
    }, [accessRequest]);

    //   useEffect(() => {
    //     if (identifier === "GET_ACCESS_REQUEST_PERMIT") {
    //       console.log(permit);
    //       // eslint-disable-next-line array-callback-return
    //       accessrequest?.current.locations.map((item, index) => {
    //         if (
    //           moment().isSameOrAfter(
    //             moment(item.startDate + " " + item.startTime).add(-12, "hours")
    //           ) &&
    //           moment().isSameOrBefore(moment(item.endDate + " " + item.endTime))
    //         ) {
    //           setShowPermit(true);
    //           setValidPermit(item);
    //         }
    //       });
    //     }
    //   }, [identifier, permit]);

    const { toPDF, targetRef } = usePDF({
        filename: "Metrolink Permit.pdf",
        page: { margin: Margin.MEDIUM },
    });

    let spinner = null;
    if (loading) spinner = <Spinner />;

    return (
        <div className="container mt-3">
            <Backdrop show={loading} />

            {spinner}

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {accessRequest?.status === "Granted" && showPermit ? (
                <div>
                    <div className="text-center">
                        <button className="btn btn-primary m-2" onClick={toPDF}>
                            Download PDF
                        </button>
                    </div>

                    <div ref={targetRef}>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <h1>Permit to work</h1>
                                    <p>
                                        Prepared by{" "}
                                        <strong>
                                            {validPermit?.preparedBy}
                                        </strong>{" "}
                                        on the{" "}
                                        <strong>
                                            {moment(
                                                validPermit?.approvedDate
                                            ).format("DD/MM/YYYY")}
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            Printed:{" "}
                                            {moment().format("DD/MM/YYYY")}
                                        </strong>
                                    </p>
                                </div>
                                <img src={logo} alt="Company Logo" />
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Details</div>
                                    <p className="mb-1">
                                        Department / Contractor:{" "}
                                        <strong>
                                            {validPermit?.organisation}
                                        </strong>
                                    </p>
                                    <p className="mb-1">
                                        Worksite Limits:{" "}
                                        <strong>
                                            {validPermit?.worksiteLimits}
                                        </strong>
                                    </p>
                                    <p className="mb-1">
                                        Nature of Works:{" "}
                                        <strong>
                                            {validPermit?.natureOfWork}
                                        </strong>
                                    </p>
                                </div>
                                <div className="p-3">
                                    <QRCode
                                        size={100}
                                        style={{
                                            height: "auto",
                                            maxWidth: "100%",
                                            width: "100%",
                                        }}
                                        value="Hello World"
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="fw-bold">Permit</div>
                                    <div className="row g-2">
                                        <div className="form-floating col-sm-6">
                                            <p className="m-0">
                                                Starts:{" "}
                                                <strong>
                                                    {moment(
                                                        validPermit.date +
                                                            " " +
                                                            validPermit.startTime
                                                    ).format(
                                                        "DD/MM/YYYY HH:mm"
                                                    )}
                                                </strong>
                                            </p>
                                            <p className="m-0">
                                                Ends:{" "}
                                                <strong>
                                                    {moment(
                                                        validPermit.date +
                                                            " " +
                                                            validPermit.endTime
                                                    ).format(
                                                        "DD/MM/YYYY HH:mm"
                                                    )}
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating  col-sm-6">
                                            <p className="m-0">
                                                Location(s):{" "}
                                                <strong>
                                                    {validPermit?.locations.join(
                                                        ", "
                                                    )}
                                                </strong>
                                            </p>
                                            <p className="m-0">
                                                Shifts:{" "}
                                                <strong>
                                                    {validPermit?.shifts}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="fw-bold">Protection</div>
                                    <div className="row g-2">
                                        <div className="form-floating col-sm-6">
                                            <p className="mb-1">
                                                Is a physical possession
                                                required?{" "}
                                                <strong>
                                                    {accessRequest
                                                        ?.planningInformation
                                                        .possessionCategory ===
                                                    "No Possession Req/Blue Permit Works"
                                                        ? "No"
                                                        : "Yes"}
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-6">
                                            <p className="m-0">
                                                Possession Category:{" "}
                                                <strong>
                                                    {
                                                        accessRequest
                                                            ?.planningInformation
                                                            .possessionCategory
                                                    }
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="form-floating col-sm-6">
                                            <p className="mb-1">
                                                Is any electrical possession
                                                required?{" "}
                                                <strong>
                                                    {accessRequest
                                                        ?.planningInformation
                                                        .isolationType ===
                                                    "All OHLE is Live"
                                                        ? "No"
                                                        : "Yes"}
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-6">
                                            <p className="m-0">
                                                Switching Program:{" "}
                                                <strong>
                                                    {
                                                        accessRequest
                                                            ?.planningInformation
                                                            .switchingProgram
                                                    }
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div
                                    className="alert alert-warning m-0"
                                    role="alert"
                                >
                                    <p className="m-0 text-center">
                                        Permit uncontrolled when copied or
                                        printed
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <ul className="list-group mt-3">
                            <li className="list-group-item">
                                <div className="ms-2 me-auto">
                                    <h1>Worksite Record</h1>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="h4 mb-2">
                                    1. Physical Protection
                                </div>
                                <div className="me-auto">
                                    <div className="row g-2">
                                        <div className="form-floating col-sm-6">
                                            <p className="m-0 mb-2">
                                                <strong>
                                                    I (Name in capitals):
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating  col-sm-6">
                                            <p className="m-0 mb-2">
                                                <strong>
                                                    Or on behalf of (PICOP)
                                                    (Name in capitals):
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="me-auto border p-1">
                                    <div className="row g-2 mb-2">
                                        <div className="form-floating col-sm-6">
                                            <p className="m-0 mb-2">
                                                <strong>
                                                    Certify that the above
                                                    possession is in force.
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-2">
                                            <p className="m-0 mb-2">
                                                <strong>Date: </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-2">
                                            <p className="m-0 mb-2">
                                                <strong>Time: </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-2">
                                            <p className="m-0 mb-2">
                                                <strong>Signature: </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="me-auto mt-2">
                                    <div className="row g-2 mb-2">
                                        <p className="m-0 ">
                                            <strong>
                                                Details any other protection or
                                                Precautions that are required:
                                            </strong>
                                        </p>
                                        <div className="me-auto border p-1">
                                            <p>-</p>
                                            <p>-</p>
                                            <p>-</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="me-auto border p-1">
                                    <div className="row g-2">
                                        <div className="form-floating col-sm-6">
                                            <p className="m-0 mb-2">
                                                <strong>
                                                    Status of NWR adjacent
                                                    lines:
                                                </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-2">
                                            <p className="m-0 mb-2">
                                                <strong>Open</strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-2">
                                            <p className="m-0 mb-2">
                                                <strong>Blocked</strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-2">
                                            <p className="m-0 mb-2">
                                                <strong>N/A</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* 2 Electrical Protection */}
                            <li className="list-group-item">
                                <div className="me-auto mb-2">
                                    <div className="h4 mb-2">
                                        2. Electrical Protection
                                    </div>

                                    <div className="me-auto border p-1">
                                        <div className="row g-2 mb-2">
                                            <div className="form-floating col-sm-6">
                                                <p className="m-0 mb-2">
                                                    <strong>
                                                        Is any electrical
                                                        protection required?
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-1">
                                                <p className="m-0 mb-2">
                                                    <strong>No</strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-1">
                                                <p className="m-0 mb-2">
                                                    <strong>Yes</strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>
                                                        Switching Program No:
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="me-auto mt-2">
                                        <div className="row g-2 mb-2">
                                            <p className="m-0 ">
                                                <strong>
                                                    Must be implemented to:
                                                </strong>
                                            </p>
                                            <div className="border">
                                                <p>-</p>
                                                <p>-</p>
                                                <p>-</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="me-auto mt-2">
                                    <div className="row g-2 mb-2 mt-2 border">
                                        <p className="m-0 ">
                                            <strong>
                                                I certify the above switching
                                                program has been completed and
                                                the isolation control sheet
                                                updated with this permit.
                                            </strong>
                                        </p>
                                        <div className="form-floating col-sm-4">
                                            <p className="m-0 mb-2">
                                                <strong>Date: </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-4">
                                            <p className="m-0 mb-2">
                                                <strong>Time: </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-4">
                                            <p className="m-0 mb-2">
                                                <strong>Signature: </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* Permit issue */}
                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="h4 mb-2">
                                        3. Permit Issue
                                    </div>

                                    <div className="me-auto border">
                                        <div className="row g-2 mb-2">
                                            <div className="form-floating col-sm-6">
                                                <p className="m-0 mb-2">
                                                    <strong>
                                                        Permit Issued by (Name
                                                        in capitals):
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-2">
                                                <p className="m-0 mb-2">
                                                    <strong>Date: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-1">
                                                <p className="m-0 mb-2">
                                                    <strong>Time: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Signature: </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* 4 acceptance */}
                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="h4 mb-2">4. Acceptance</div>

                                    <div className="me-auto mt-2">
                                        <div className="row g-2 mb-2 mt-2 border">
                                            <p className="m-0 ">
                                                <strong>
                                                    I have read this permit and
                                                    understand that it is only
                                                    valid when Parts 1, 2, 3,
                                                    and 4 are complete, and then
                                                    only between the times
                                                    stated.
                                                </strong>
                                            </p>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>PIC: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Date: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Time: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Signature: </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* Transfer */}
                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="h4 mb-2">5. Transfer</div>
                                    <p>
                                        The permit may only be transferred with
                                        the consent of the PICOP, or Senior
                                        Controller. The person to whom it is
                                        transferred accepts full responsibility
                                        for it. Both the PIC and the
                                        PICOP/Senior Controller copies must be
                                        updated with the details of any
                                        transfer.
                                    </p>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">
                                                    From PIC Signature
                                                </th>
                                                <th scope="col">To PIC Name</th>
                                                <th scope="col">
                                                    To PIC Signature
                                                </th>
                                                <th scope="col">
                                                    Message Received By
                                                </th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                            {/* Cancelation of permit */}
                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="h4 mb-2">
                                        6. Cancelation of Permit
                                    </div>
                                    <p>
                                        6.1 All tools,equipment, and staff under
                                        my control have been withdrawn and staff
                                        warned that it is no longer safe to work
                                        in the area defined in the permit.
                                    </p>
                                    <div className="me-auto">
                                        <div className="row g-2 mb-2">
                                            <div className="form-floating col-sm-6">
                                                <p className="m-0 mb-2">
                                                    6.2 Have the assets been
                                                    returned to a normal
                                                    operating state?
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Yes</strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>No</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        If <strong>No</strong> please specify:
                                    </p>
                                    <div className="border">
                                        <p>-</p>
                                        <p>-</p>
                                        <p>-</p>
                                    </div>
                                    <div className="me-auto mt-2">
                                        <div className="row g-2 mb-2 mt-2 border">
                                            
                                            <div className="form-floating col-sm-2">
                                                <p className="m-0 mb-2">
                                                    <strong>PIC: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-2">
                                                <p className="m-0 mb-2">
                                                    <strong>Date: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-2">
                                                <p className="m-0 mb-2">
                                                    <strong>Time: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-2">
                                                <p className="m-0 mb-2">
                                                    <strong>Signature: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-2">
                                                <p className="m-0 mb-2">
                                                    <strong>Dictated to: </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {/* Permit accepted back */}
                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="h4 mb-2">
                                        7. Permit Accepted Back
                                    </div>
                                    <div className="me-auto mt-2">
                                        <div className="row g-2 mb-2 mt-2 border">
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Accepted back by: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Date: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Time: </strong>
                                                </p>
                                            </div>
                                            <div className="form-floating col-sm-3">
                                                <p className="m-0 mb-2">
                                                    <strong>Signature: </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                            </li>         
                            {/* 8 Worksite record of arrangements */}
                            <li className="list-group-item">
                                <div className="me-auto">
                                    <div className="h4 mb-2">
                                        8. Worksite Record of Arrangements
                                    </div>
                                    <div className="row g-2 mb-2 border">
                                        <p>This section must be used when more than one work activity is to be undertaken in the same worksite. This form my be attached to the Permit To Work above and returned to the PICOP as necessary.</p>
                                        
                                        <div className="form-floating col-sm-4">
                                            <p className="m-0 mb-2">
                                                <strong>Lead PIC Name: </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-4">
                                            <p className="m-0 mb-2">
                                                <strong>PTW No: </strong>
                                            </p>
                                        </div>
                                        <div className="form-floating col-sm-4">
                                            <p className="m-0 mb-2">
                                                <strong>Worksite limits: </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p>8.1 Record of arrangements</p>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">PIC Name</th>
                                            <th scope="col">Contact No</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Start Time</th>
                                            <th scope="col">End Time</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Description of works/On track machines</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>8.2 PIC signing on with the Lead PIC(SPIC) are to be briefed on the working arrangements, including any isolations, limits, and ON TRACK MACHINES MOVEMENTS.</p>
                                <p>8.3 I Confirm that the PICs listed above have confirmed that they no longer need the protection afforded by the worksite and that all equipment has been returned to a normal operating state prior to cancelling the PTW.</p>
                                <div className="row g-2 mb-2 mt-2 border">
                                    <div className="form-floating col-sm-3">
                                        <p className="m-0 mb-2">
                                            <strong>Name: </strong>
                                        </p>
                                    </div>
                                    <div className="form-floating col-sm-3">
                                        <p className="m-0 mb-2">
                                            <strong>Date: </strong>
                                        </p>
                                    </div>
                                    <div className="form-floating col-sm-3">
                                        <p className="m-0 mb-2">
                                            <strong>Time: </strong>
                                        </p>
                                    </div>
                                    <div className="form-floating col-sm-3">
                                        <p className="m-0 mb-2">
                                            <strong>Signature: </strong>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    No permit is available. Please contact Metrolink.
                </div>
            )}
        </div>
    );
};

export default Permit;
