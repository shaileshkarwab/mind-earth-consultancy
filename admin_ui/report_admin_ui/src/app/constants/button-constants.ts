import { ButtonModel } from "../models/button-model";
import { BoxIcon } from "./box-icon";
import { ToolBarAction } from "./tool-bar-action";

export class ButtonConstants {
    static AddButton(): ButtonModel {
        const btn: ButtonModel = {
            icon: '',
            type: 'button',
            class: 'btn btn-primary',
            iconClass: BoxIcon.ADD,
            key: ToolBarAction.ADD
        };
        return btn;
    }

    static BackButton(): ButtonModel {
        const btn: ButtonModel = {
            icon: '',
            type: 'button',
            class: 'btn btn-primary',
            iconClass: BoxIcon.BACK,
            key: ToolBarAction.BACK
        };
        return btn;
    }
}
