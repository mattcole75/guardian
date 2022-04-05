import React from 'react';
import MapItem from './mapItem';
import locationList from './../../data/locations';

const map = () => (
        <div className="map-container">
            {   
                locationList.map(item => {
                    return <MapItem key={item.code} name={item.name} code={item.code}/>
                })
            }

            {/* <div className="map-item_rtc">RTC</div>
            <div className="map-item_roc">ROC</div>
            <div className="map-item_neb">NEB</div>
            <div className="map-item_kin">KIN</div>
            <div className="map-item_mil">MIL</div>
            <div className="map-item_neh">NEH</div>
            <div className="map-item_shc">SHC</div>
            <div className="map-item_der">DER</div>
            <div className="map-item_ohm">OHM</div>
            <div className="map-item_bry">BRY</div>
            <div className="map-item_ohc">OHC</div>
            <div className="map-item_ecc">ECC</div>
            <div className="map-item_rad">RAD</div>
            <div className="map-item_ohk">OHK</div>
            <div className="map-item_ldw">LDW</div>
            <div className="map-item_wfd">WFD</div>
            <div className="map-item_wwd">WWD</div>
            <div className="map-item_wst">WST</div>
            <div className="map-item_bob">BOB</div>
            <div className="map-item_fre">FRE</div>
            <div className="map-item_lgw">LGW</div>
            <div className="map-item_prs">PRS</div>
            <div className="map-item_soc">SOC</div>
            <div className="map-item_trc">TRC</div>
            <div className="map-item_bdw">BDW</div>
            <div className="map-item_hpk">HPK</div>
            <div className="map-item_hol">HOL</div>
            <div className="map-item_evc">EVC</div>
            <div className="map-item_mec">MEC</div>
            <div className="map-item_bkv">BKV</div>
            <div className="map-item_fal">FAL</div>
            <div className="map-item_par">PAR</div>
            <div className="map-item_hbc">HBC</div>
            <div className="map-item_crp">CRP</div>
            <div className="map-item_nhm">NHM</div>
            <div className="map-item_vlg">VLG</div>
            <div className="map-item_anc">ANC</div>
            <div className="map-item_abm">ABM</div>
            <div className="map-item_qrd">QRD</div>
            <div className="map-item_cep">CEP</div>
            <div className="map-item_iwm">IWM</div>
            <div className="map-item_sfq">SFQ</div>
            <div className="map-item_qns">QNS</div>
            <div className="map-item_mon">MON</div>
            <div className="map-item_wsd">WSD</div>
            <div className="map-item_exq">EXQ</div>
            <div className="map-item_exs">EXS</div>
            <div className="map-item_vic">VIC</div>
            <div className="map-item_pom">POM</div>
            <div className="map-item_shl">SHL</div>
            <div className="map-item_cnk">CNK</div>
            <div className="map-item_dcf">DCF</div>
            <div className="map-item_sps">SPS</div>
            <div className="map-item_mks">MKS</div>
            <div className="map-item_tfb">TFB</div>
            <div className="map-item_pcg">PCG</div>
            <div className="map-item_old">OLD</div>
            <div className="map-item_tfd">TFD</div>
            <div className="map-item_fir">FIR</div>
            <div className="map-item_pic">PIC</div>
            <div className="map-item_str">STR</div>
            <div className="map-item_cho">CHO</div>
            <div className="map-item_nis">NIS</div>
            <div className="map-item_dan">DAN</div>
            <div className="map-item_swr">SWR</div>
            <div className="map-item_hot">HOT</div>
            <div className="map-item_sal">SAL</div>
            <div className="map-item_wth">WTH</div>
            <div className="map-item_bmr">BMR</div>
            <div className="map-item_spc">SPC</div>
            <div className="map-item_brk">BRK</div>
            <div className="map-item_brt">BRT</div>
            <div className="map-item_swp">SWP</div>
            <div className="map-item_vel">VEL</div>
            <div className="map-item_tmp">TMP</div>
            <div className="map-item_wdd">WDD</div>
            <div className="map-item_nmr">NMR</div>
            <div className="map-item_cla">CLA</div>
            <div className="map-item_nav">NAV</div>
            <div className="map-item_ddv">DDV</div>
            <div className="map-item_wpk">WPK</div>
            <div className="map-item_edl">EDL</div>
            <div className="map-item_alt">ALT</div>
            <div className="map-item_edd">EDD</div>
            <div className="map-item_mrd">MRD</div>
            <div className="map-item_cer">CER</div>
            <div className="map-item_bag">BAG</div>
            <div className="map-item_dyl">DYL</div>
            <div className="map-item_rth">RTH</div>
            <div className="map-item_aud">AUD</div>
            <div className="map-item_mar">MAR</div>
            <div className="map-item_asm">ASM</div>
            <div className="map-item_bch">BCH</div>
            <div className="map-item_asw">ASW</div>
            <div className="map-item_cro">CRO</div>
            <div className="map-item_ash">ASH</div>
            <div className="map-item_wyc">WYC</div>
            <div className="map-item_rbn">RBN</div>
            <div className="map-item_plh">PLH</div>
            <div className="map-item_shd">SHD</div>
            <div className="map-item_air">AIR</div> */}
        </div>
);

export default map;