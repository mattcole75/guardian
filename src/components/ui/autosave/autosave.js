import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import debounce from 'debounce';
import useDeepCompareEffect from "use-deep-compare-effect";

const Autosave = memo(props => {

    const { defaultValues, onSubmit, delay } = props;

    // a reference to all hook methods
    const methods = useFormContext();
    // const { isDirty, isSubmitting } = methods.formState;
    const { isDirty } = methods.formState;

    // call save method but not within a 2000ms of a previous call
    // eslint-disable-next-line
    const debouncedSave = useCallback(
        debounce(() => {
            methods.handleSubmit(onSubmit)();
        }, delay), []
    );

    // watch for changes
    const watchedData = useWatch({
        control: methods.control, 
        defaultValue: defaultValues
    });

    useDeepCompareEffect(() => {
        if (isDirty) {
            debouncedSave();
        }
    }, [watchedData]);

    return (
        <div>
            {/* {isSubmitting
                ?<div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                : null
            } */}
        </div>
    );

})

export default Autosave;