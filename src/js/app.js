App = {
  web3Provider: null,
  contracts: {},

  init: function () {


    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Realestate.json', function (data) {
      var HouseArtifact = data;
      App.contracts.Realestate = TruffleContract(HouseArtifact);

      App.contracts.Realestate.setProvider(App.web3Provider);

      return App.render();
    });

  },
  // todo edit HTML


  render: function () {
    var houseInstance;
    var loader = $('#loader')
    var content = $('#content')

    loader.show();
    content.hide();

    //load account data
    web3.eth.getCoinbase((err, account) => {
      if (!err) {
        App.accoutn = account;
        console.log(account)
        $('#accountAddress').html('Your Account: ' + account + "   " + "</br>" + "<button class='btn btn-primary up'>    Up</button>")
      }
    });
    // load contract data
    App.contracts.Realestate.deployed().then(function (instance) {

      houseInstance = instance;
      return houseInstance.housesCount();
    }).then(function (housesCount) {
      console.log(housesCount)

      var housesResult = $("#housesResult1")
      for (i = 1; i <= housesCount; i++) {
        houseInstance.houses(i).then((house) => {
          var id = house[0];
          var title = house[1];
          var seller = house[2].toString();
          var streetAddress = house[3];
          var price = house[4];
          var buyer = house[5];
          // render houses
          console.log('asdasd', price.toNumber())
          var btn = ''
          if (buyer == '0x0000000000000000000000000000000000000000') {
            //+ id + "," + price + "," + seller + ","
            btn = "<button id='" + id + "' class='btn btn-primary btnBuy' onclick='App.buy(" + id + "," + price + "," + seller + ")'>Buy</button>"
            //"<div id='" + 'div' + id + "' class='btn btn-primary btnBuy'>"+seller+"</div>"
          }
          var houseTemplate = "<div id='housesResult'>" + "<div> ID: " + id + "</div><br>" +
            "<div>Description: " + title + "</div><br>" + "<div>Seller: " + "<span  id='" + 'seller' + id + "'>" + seller + "</span>" + "</div><br>" +
            "<div>Address: " + streetAddress + "</div><br>" + "<div> Price(wei): " + "<span  id='" + 'price' + id + "'>" + price + "</span>" + "</div><br>" +
            "<div> Buyer: " + buyer + "</div>" +
            btn +
            "</div>"
          housesResult.append(houseTemplate)
        })
      }
      loader.hide();
      content.show()
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  buy: function (id, seller, price) {
    event.preventDefault();


    console.log(document.getElementById('seller' + id).innerHTML)
    event.preventDefault();
    var realestateInstance;
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(web3.toWei(parseInt(document.getElementById('price' + id).innerHTML), 'ether'))
      App.contracts.Realestate.deployed().then(function (instance) {

        realestateInstance = instance;
        web3.eth.sendTransaction({
          to: document.getElementById('seller' + id).innerHTML,
          from: account,
          value: web3.toWei(parseInt(document.getElementById('price' + id).innerHTML), 'ether')
        }, console.log)
        // Execute adopt as a transaction by sending account
        return realestateInstance.buyHouse(id);
      }).then(function (result) {
        console.log(result)
      }).catch(function (err) {
        console.log('asdsa', err.message);
      });
    });
  }


};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
