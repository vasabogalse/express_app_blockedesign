// Create global userWalletAddress variable
window.userWalletAddress = null;

// when the browser is ready
window.onload = async (event) => {
  // check if ethereum extension is installed
  if (window.ethereum) {
    // create web3 instance
    window.web3 = new Web3(window.ethereum);
  } else {
    // prompt user to install Metamask
    alert("Please install MetaMask or any Ethereum Extension Wallet");
  }

  // check if user is already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress");

  // show the user dashboard
  showUserDashboard();
};

// Web3 login function
const loginWithEth = async () => {
  // check if there is global window.web3 instance
  if (window.web3) {
    try {
      // get the user's ethereum account - prompts metamask to login
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          window.userWalletAddress = accounts[0]
          // store the user's wallet address in local storage
          window.localStorage.setItem("userWalletAddress", accounts[0]);
        })
        .catch(() => {
          // if the user cancels the login prompt
          throw Error("Please select an account");
        });

      // userWalletAddress variable to selected account
      console.log(window.userWalletAddress)

      // show the user dashboard
      showUserDashboard();
    } catch (error) {
      alert(error);
    }
  } else {
    alert("wallet not found");
  }
};

// function to show the user dashboard
const showUserDashboard = async () => {
  // if the user is not logged in - userWalletAddress is null
  if (!window.userWalletAddress) {
    // change the page title
    document.title = "Web3 Login";

    // show the login section
    //document.querySelector(".login-section").style.display = "flex";
    document.querySelector(".wallet-img").style.display = "flex";

    // hide the user dashboard section
    //document.querySelector(".dashboard-section").style.display = "none";
    const wallettitleEl = document.querySelector(".wallet-dialog");
    wallettitleEl.innerHTML = 'Login With Metamask'
    document.querySelector(".logout-nav").style.display = "none";
    // return from the function
    return false;
  }

  // change the page title
  document.title = "Web3 Dashboard  🤝";

  // hide the login section
  //document.querySelector(".login-section").style.display = "none";

  // show the dashboard section
  //document.querySelector(".dashboard-section").style.display = "flex";

  // show the user's wallet address
  showUserWalletAddress();

  // get the user's wallet balance
  getWalletBalance();
};

// show the user's wallet address from the global userWalletAddress variable
const showUserWalletAddress = () => {
  document.querySelector(".logout-nav").style.display = "flex";
  document.querySelector(".wallet-img").style.display = "none";
  const walletDialogEl = document.querySelector(".wallet-dialog");
  const addr = window.localStorage.getItem("userWalletAddress")
  walletDialogEl.innerHTML = addr.slice(0,5) + '...' + addr.substring(addr.length -5)
};

// get the user's wallet balance
const getWalletBalance = async () => {
  // check if there is global userWalletAddress variable
  if (!window.userWalletAddress) {
    return false;
  }

  // get the user's wallet balance
  const balance = await window.web3.eth.getBalance(window.userWalletAddress);

  // convert the balance to ether
  document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
    balance,
    "ether"
  );
};

// web3 logout function
const logout = () => {
  // set the global userWalletAddress variable to null
  window.userWalletAddress = null;

  // remove the user's wallet address from local storage
  window.localStorage.removeItem("userWalletAddress");

  // show the user dashboard
  showUserDashboard();
};

// when the user clicks the login button run the loginWithEth function
document.querySelector(".login-btn").addEventListener("click", loginWithEth);

// when the user clicks the logout button run the logout function
document.querySelector(".logout-btn").addEventListener("click", logout);