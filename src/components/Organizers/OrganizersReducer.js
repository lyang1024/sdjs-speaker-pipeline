
const initialstate = {
	adminList       : [], 
    newAdminEmail   : '',
    newAdminName    : '',
	newAdminPhone   : '',
	newAdminPassword: '',
}
export default function OrganizersReducer(state = initialstate, action) {
	const { payload, type } = action;

	switch (type) {
        case 'ON_CHANGE': {
			return {
				...state,
				...payload
			}
        }
		case 'DELETE_ADMIN_FULFILLED': {
			const newAdminList = [...state.adminList]; //this is a copy of admin list
			  const admin = newAdminList.findIndex(admin => { //admin represents the object i want to delete
            return admin.id == payload
			});

			const updatedList = newAdminList.splice(admin, 1) //updated list represents the new adminList after splicing out the deleted admin
			return {
				...state,
				adminList: newAdminList
			}
		}
		case 'GET_ADMINS_FULFILLED': {
			return {
				...state,
				adminList: payload
			}
		}
		case 'ADD_ADMIN_FULFILLED': {
			return {
				...state,
				adminList: state.adminList.concat(payload.data),
				newAdminEmail: '',
				newAdminName : '',
				newAdminPhone: ''
			}
		}
		case 'PATCH_ADMIN': {
			return {
				...state,
				adminList: payload.data
			}
		}
		case 'PATCH_ADMIN_FULFILLED': {
			const newAdminList = [...state.adminList];
			newAdminList.splice(payload.index, 1, { 
				...newAdminList[payload.index], 
				...payload.user,
				isEditing: !newAdminList[payload.index].isEditing 
			});
			return {
				...state,
				adminList: newAdminList
			}
		}
		case 'TOGGLE_EDIT': {
			const newAdminList = [...state.adminList];
			newAdminList.splice(payload, 1, { 
				...newAdminList[payload], 
				isEditing: !newAdminList[payload].isEditing 
			});
			return {
				...state,
				adminList: newAdminList
			}
		}
		default: {
			return state
		}
	}
}
