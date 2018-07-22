var Realestate = artifacts.require("./RealEstate.sol");


contract("Realestate", (account)=>{
    it('test find function', ()=>{
        return Realestate.deployed().then((i)=>{
            return i.findSellerByHouseId(1)
        }).then(function(res){
           assert(res, false)
            console.log(res)
        })
    })
})