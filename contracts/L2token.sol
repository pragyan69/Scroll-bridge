// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@scroll-tech/contracts/libraries/token/IScrollERC20Extension.sol";

contract L2Token is ERC20, IScrollERC20Extension {
  // We store the gateway and the L1 token address to provide the gateway() and counterpart() functions which are needed from the Scroll Standard ERC20 interface
  address _gateway;
  address _counterpart;

  // In the constructor we pass as parameter the Custom L2 Gateway and the L1 token address as parameters
  constructor(address gateway_, address counterpart_) ERC20("My Token L2", "MTL2") {
    gateway_ = _gateway;
    counterpart_ = _counterpart;
  }

  function gateway() public view returns (address) {
    return _gateway;
  }

  function counterpart() external view returns (address) {
    return _counterpart;
  }

  // We allow minting only to the Gateway so it can mint new tokens when bridged from L1
  function transferAndCall(address receiver, uint256 amount, bytes calldata data) external returns (bool success) {
    transfer(receiver, amount);
    data;
    return true;
  }

  // We allow minting only to the Gateway so it can mint new tokens when bridged from L1
  function mint(address _to, uint256 _amount) external onlyGateway {
    _mint(_to, _amount);
  }

  // Similarly to minting, the Gateway is able to burn tokens when bridged from L2 to L1
  function burn(address _from, uint256 _amount) external onlyGateway {
    _burn(_from, _amount);
  }

  modifier onlyGateway() {
    require(gateway() == _msgSender(), "Ownable: caller is not the gateway");
    _;
  }
}