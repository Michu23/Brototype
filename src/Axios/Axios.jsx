import axios from 'axios';

const BaseURL = 'http://localhost:8000/';

const token = () =>{ return( { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`}})}

export const signupUser = async (data) => await axios.post(BaseURL + 'user/signup', data)
export const stndingData = async (data) => await axios.post(BaseURL + 'user/token', data)
export const loginUser = async (data) => await axios.post(BaseURL + 'signup', data)
export const getMyProfile = async (data) => await axios.post(BaseURL + 'user/view/profile', data,token())
export const getDomains = async (data) => await axios.post(BaseURL + 'user/view/domain', data,token())
export const backendUpdate = async (data) => await axios.post(BaseURL + 'user/update/profilephoto', data,token())
export const getReviewers = async (data) => await axios.post(BaseURL + 'admins/view/reviewers', data,token())
export const getBatches = async (data) => await axios.post(BaseURL + 'batch/view/batches', data,token())
export const getStudentTasks = async (data) => await axios.post(BaseURL + 'manifest/view/tasklist', data,token())
export const getChartData = async (data) => await axios.post(BaseURL + 'manifest/view/chartdata', data,token())
export const getPendings = async (data) => await axios.post(BaseURL + 'manifest/view/pendings', data,token())
export const getStudentManifest = async (data) => await axios.post(BaseURL + 'manifest/view/manifest', data,token())
export const isLinkValid = async (data) => await axios.post(BaseURL + 'user/validate/link', data,token())
export const updateProfile = async (data) => await axios.post(BaseURL + 'user/update/profile', data,token())
export const get_data = async (data) => await axios.post(BaseURL + 'don', data,token())
export const getNotificationsTypes = async (data) => await axios.post(BaseURL + 'user/types', data,token())
export const createNotifications = async (data) => await axios.post(BaseURL + 'user/create/notification', data,token())
export const deleteNotifications = async (data) => await axios.post(BaseURL + 'user/delete/notification', data,token())
export const showPayment = async (data) => await axios.post(BaseURL + 'payment/pay', data,token())
export const showUpFront = async (data) => await axios.post(BaseURL + 'payment/upfrontpay', data,token())
export const showShiftPayment = async (data) => await axios.post(BaseURL + 'payment/shiftpay', data,token())
export const myPayments = async (data) => await axios.post(BaseURL + 'payment/myPayments', data,token())
export const allPendingPayments = async (data) => await axios.post(BaseURL + 'payment/pending', data,token())
export const allCompletedPayments = async (data) => await axios.post(BaseURL + 'payment/completed', data,token())
export const cashpaid = async (data) => await axios.post(BaseURL + 'payment/cashpaid', data,token())
export const sendForm = async (data) => await axios.post(BaseURL + 'payment/sendform', data,token())
export const getLocations = async (data) => await axios.post(BaseURL + 'user/getLocations', data,token())
export const getBranch = async (data) => await axios.post(BaseURL + 'user/getBranches', data,token())
export const getBranchStudents = async (data) => await axios.post(BaseURL + 'user/getBatchStudents', data,token())