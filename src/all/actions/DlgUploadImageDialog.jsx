import {ActionType} from "./ActionType";

export function dlgUploadImageDialog(showValue, goCancelValue, goSubmitValue) {
    const dlgData = {
        show: showValue,
        goCancel: goCancelValue,
        goSubmit: goSubmitValue
    }
    return {type: ActionType.DLG_UPLOAD_IMAGE_DIALOG, dlgData}
}