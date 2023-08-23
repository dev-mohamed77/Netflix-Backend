export enum EndPoint {
  // Auth
  signup = 'signup',
  signin = 'signin',
  auth = 'auth',
  forgetPassword = 'forget-password',
  verifyPassResetCode = 'verify-pass-resetCode',
  resetPassword = 'reset-password',

  // user
  users = 'users',
  getMe = 'getMe',
  changePasswordLoggedUser = 'change-password',
  updateLoggedUser = 'update-user',
  deleteLoggedUser = 'delete-user',

  // Category
  categories = 'categories',

  //Plan
  plan = 'plans',
  subscribed = 'subscribed',
  unsubscribed = 'unsubscribed',

  // Movies
  movies = 'movies',

  // favorite
  favorite = 'favorite',
  addOrDeleteFavorite = 'addOrDeleteFavorite',

  // payments
  paypal = 'paypal',
  paymob = 'paymob',
  execute = 'execute',

  // Banner
  banner = 'banner',

  // Global
  id = ':id',
}
