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
  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

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
        $('#accountAddress').html('Your Account: ' + account +"   "+  "</br>"+"<button class='btn btn-primary up'>    Up</button>")
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
          var seller = house[2];
          var streetAddress = house[3];
          var price = house[4];
          // render houses
          var houseTemplate = "<div id='housesResult'>"+"<div> ID: " + id+ "</div><br>" +
           "<div>Description: " +  title + "</div><br>" + "<div>Seller: " + seller + "</div><br>" +   
              "<div>Address: " + streetAddress + "</div><br>" + "<div> Price(wei): " + price + "</div><br>"+
                "<button id='"+id+"' class='btn btn-primary btnBuy'>Buy</button>"
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

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
