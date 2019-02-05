import {ActionType} from '../actions/ActionType'
import {Map} from "immutable";

function DlgDomain(state = Map(), action) {
    switch (action.type) {
        case ActionType.DLG_LOGIN:
            return state.set("loginDialog", action.dlgData)
        case ActionType.DLG_REGISTER_DIALOG_1:
            return state.set("register1Dialog", action.dlgData)
        case ActionType.DLG_REGISTER_DIALOG_2:
            return state.set("register2Dialog", action.dlgData)
        case ActionType.DLG_REGISTER_DIALOG_2_OK:
            return state.set("register2OkDialog", action.dlgData)
        case ActionType.DLG_REGISTER_DIALOG_3:
            return state.set("register3Dialog", action.dlgData)
        case ActionType.DLG_REGISTERREQ_DIALOG_2:
            return state.set("registerReq2Dialog", action.dlgData)
        case ActionType.DLG_REGISTERREQ_DIALOG_2OK:
            return state.set("registerReq2OkDialog", action.dlgData)
        case ActionType.DLG_UPLOAD_IMAGE_DIALOG:
            return state.set("uploadImageDialog", action.dlgData)
        case ActionType.TMP_DLG_LANGUAGE_SELECT:
            return state.set("tmpLanguageSelectDialog", action.dlgData)
        default:
            return state
    }
}

export default DlgDomain