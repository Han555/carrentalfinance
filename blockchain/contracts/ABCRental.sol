// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 < 0.9.0;

contract ABCRental {

    enum CarState { Available, Rented, Damaged }
    address ABCOwner; 
    uint public carCount;
    mapping (uint => Car) public carCatalogue;

    struct Car {
        uint _id;
        uint _noOfSeaters;
        string _carBrand;
        uint _costPerDay;
        CarState _carState;
        address _rentee;
        uint _damagesCost;
    }

    constructor() {
        ABCOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == ABCOwner, "NOT CONTRACT OWNER!");
        _;
    }

    modifier checkCarAvailability(uint _carId) {
        require(_carId <= carCount, "INVALID CAR ID!");
        require(carCatalogue[_carId]._carState == CarState.Available, "CAR UNAVAILABLE!");
        _;
    }

    modifier checkCarDetails(uint _carId, address _customerId) {
        require(carCatalogue[_carId]._id == _carId, "INCORRECT CAR RETURNED!");
        require(carCatalogue[_carId]._rentee == _customerId, "WRONG CUSTOMER!");
        _;
    }

    modifier checkDamages(uint _carId, uint _damageFees, address _rentee) {
        require(_carId <= carCount, "INVALID CAR ID!");
        require(carCatalogue[_carId]._carState == CarState.Damaged, "CAR IS NOT DAMAGED!");
        require(carCatalogue[_carId]._damagesCost > 0, "DAMAGE NOT EVALUATED YET!");
        require(carCatalogue[_carId]._damagesCost == _damageFees, "INCORRECT AMOUNT PAID!");
        require(carCatalogue[_carId]._rentee == _rentee, "WRONG RENTEE");
        _;
    }

    function addCar(string memory _carBrand, uint _noOfSeaters, uint _costPerDay) 
        public onlyOwner {
        incrementCarCount();
        carCatalogue[carCount] = Car(carCount, _noOfSeaters, _carBrand, _costPerDay, CarState.Available, msg.sender, 0);
    } 

    function rentCar(uint _carId, uint _noOfDays, uint _amountPaid) payable
        public checkCarAvailability(_carId) {
        require(_amountPaid == (_noOfDays * carCatalogue[_carId]._costPerDay), "INCORRECT PAYMENT!");
        carCatalogue[_carId]._carState = CarState.Rented;
        carCatalogue[_carId]._rentee = msg.sender;
    }

    function returnCar(uint _carId, bool _isDamaged)
        public checkCarDetails(_carId, msg.sender) {
        if(_isDamaged) {
            carCatalogue[_carId]._carState = CarState.Damaged;
        } else {
            carCatalogue[_carId]._carState = CarState.Available;
            carCatalogue[_carId]._rentee = ABCOwner;
        }
    }

 //   function payDamages(uint _carId) payable
 //       public checkDamages(_carId, msg.value, msg.sender) {
 //       ABCOwner.transfer(msg.value);
 //       carCatalogue[_carId]._damagesCost = 0;
 //       carCatalogue[_carId]._rentee = ABCOwner;
 //   }

    function evaluateDamages(uint _carId, uint _damageCost) 
        public onlyOwner {
        require(carCatalogue[_carId]._carState == CarState.Damaged, "CAR IS NOT DAMAGED!");
        require(carCatalogue[_carId]._damagesCost == 0, "DAMAGES ALREADY EVALUATED!");
        carCatalogue[_carId]._damagesCost = _damageCost;
    }

    function repairCar(uint _carId) 
        public onlyOwner {
        require(_carId <= carCount, "INVALID CAR ID!");
        require(carCatalogue[_carId]._carState == CarState.Damaged, "CAR IS NOT DAMAGED!");
        require(carCatalogue[_carId]._damagesCost == 0, "DAMAGES NOT PAID!");
        carCatalogue[_carId]._carState = CarState.Available;
    }

    function incrementCarCount() internal {
        carCount++;
    }

    function getAllCars() public view returns (Car[] memory){
        Car[] memory ret = new Car[](carCount);
        for (uint i = 0; i < carCount; i++) {
            ret[i] = carCatalogue[i+1];
        }
        return ret;
    }
}