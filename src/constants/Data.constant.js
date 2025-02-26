/* eslint-disable prettier/prettier */
// const GOOGLE_MAPS_APIKEY = 'AIzaSyCnNf6kIq3DO1pSmHlP3qlehZgeaibm4oM';
const GOOGLE_MAPS_APIKEY = 'AIzaSyArqlT_3Q9fHcisw6lvvUGTcObXGz3GEJk';

const domainUrl = 'https://kalyanonlinematka567.com/';

const mainUrl = domainUrl + 'application_api/';
const imageServerUrl = domainUrl + 'application_api/';
const USER_TYPE = "User"
const base = {
  login: mainUrl + 'login.php',
  signUp: mainUrl + 'signup.php',
  forgetPassword: mainUrl + 'forgot-password',
  changePassword: mainUrl + 'change_password.php',
  home: mainUrl + 'get_games.php',
  getProfile: mainUrl + 'get_profile.php',
  bankUpdate: mainUrl + 'edit_profile.php',
  slider: mainUrl + 'get_slider.php',
  get_win_report: mainUrl + 'get_win_report.php',
  get_bid_history: mainUrl + 'get_bid_history.php',
  app_setting: mainUrl + 'get_wallet.php',
  get_wallet_history: mainUrl + 'get_wallet_history.php',
  setBid: mainUrl + "set_bid_new.php",
  getGameChart:mainUrl+"get_game_chart.php",
  withdrawRequest:mainUrl+"withdraw_request.php",
  getWithdrawRequest:mainUrl+"get_request_history.php",
  deleteAccount: mainUrl + 'delete_account.php',
  addMoney: mainUrl + 'add_amount.php',
  getGameRate:mainUrl + 'get_rates.php',
  fund_transfer:mainUrl+'fund-transfer.php',
  addBank:mainUrl+'add_bank.php'

};

// export { mainUrl, base, };
export { base, GOOGLE_MAPS_APIKEY, domainUrl, imageServerUrl, USER_TYPE };
