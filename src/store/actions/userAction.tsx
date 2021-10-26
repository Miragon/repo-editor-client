import {AxiosResponse} from "axios";
import {UserApi, UserInfoTO} from "../../api";
import helpers from "../../util/helperFunctions";


export const getUserInfo = async(): Promise<AxiosResponse<UserInfoTO>> => {
    const userController = new UserApi();
    const config = helpers.getClientConfig();
    const response = userController.getUserInfo(config);
    return response;
}