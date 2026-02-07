export default function validateRequestBody (RequestObjectBody, RequiredFeilds) {

    for (let i = 0; i < RequiredFeilds.length; i ++) {

        if (!RequestObjectBody[RequiredFeilds[i]]) {

            return { valid: false, message: `The '${RequiredFeilds[i]}' feild is required ...` };
        }
    };

    return { valid: true, message: `Valid request feilds provided !` };
};