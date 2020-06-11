import React from 'react';
import Web3 from 'web3';
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './quotecontract.js';

const web3 = new Web3("http://localhost:7545");
//const web3 = new Web3(window.web3.currentProvider);
class Stock extends React.Component {
    
    constructor() {
        super();
        this.state = { data: [] };
        this.handleChange = this.handleChange.bind(this);
        this.getApiInfo = this.getApiInfo.bind(this);
        this.setStockInfo=this.setStockInfo.bind(this);
    }
    handleChange(event) {
        this.setState({ symbol: event.target.value });
    }
    getApiInfo(event) {
        
        try {
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=KEY`).then(res => res.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        symbol: result["Global Quote"]["01. symbol"],
                        price: result["Global Quote"]["05. price"],
                        volume: result["Global Quote"]["06. volume"]
                    });
                }
                )

        }
        catch (error) {
            console.log('fetch failed', error);
        }
        event.preventDefault();
    }
    async setStockInfo(event){
        event.preventDefault();
        try {
           
            const accounts = await web3.eth.getAccounts()
            console.log("Account 0 = ", accounts[0] )
            const stockQuote = new web3.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS)
            console.log(this.state.symbol);
            const retval = await stockQuote.methods.setStock(web3.utils.fromAscii(this.state.symbol), parseInt(this.state.price), parseInt(this.state.volume)).send({ from: accounts[0] });
            console.log(retval);

        }
        catch (error) {
            console.log('fetch failed', error);
        }
       // event.preventDefault();
    }
    /*async getStockInfo(event){
        event.preventDefault();
        try {*/

    render() {
        return (
            <div>
                <h3>Stock Oracle</h3>
                <label>
                    Stock Symbol:
          <input type="text" value={this.state.symbol} onChange={this.handleChange} />
                </label>
                <button type="button" onClick={this.getApiInfo}>Stock Price(API)</button>&nbsp;&nbsp;
                <button type="button" onClick={this.setStockInfo}>Set Stock(Smart Contract)</button>&nbsp;
                <button type="button" onClick={this.getStockInfo}>Get Stock(Smart Contract)</button>
                <h4>Stock Info from API</h4>
            Symbol: {this.state.symbol}<br />
            Price: {this.state.price}<br />
            Volume: {this.state.volume}<br />

            </div>

        );
    }
}
export default Stock;