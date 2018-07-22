var RealEstate = artifacts.require("./RealEstate.sol");


contract("RealEstate", (account)=>{
    it('Test buy function', ()=>{
        return RealEstate.deployed().then((i)=>{
            return i.buyHouse(1)
        }).then(function(res){
           assert(res, false)
            console.log(res)
        })
    })
})