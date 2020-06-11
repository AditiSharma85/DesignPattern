import React from 'react';
import Web3 from 'web3';
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './quotecontract.js';


class Stock extends React.Component{
    constructor(){
        super();
        this.state={data:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   /* componentDidMount(){
    //async componentDidMount(){
        try{
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
           /* const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey=KEY');
            console.log(response);
            const json = await response.json();
            console.log(json);
            console.log(json["Global Quote"]);
            console.log(json["Global Quote"]["05. price"]);
            this.setState({symbol: json["Global Quote"]["01. symbol"], price: json["Global Quote"]["05. price"], volume: json["Global Quote"]["06. volume"]});
            const web3 = new Web3("http://localhost:7545")
            const accounts = await web3.eth.getAccounts()
            console.log("Account 0 = ", accounts[0] )
            const stockQuote = new web3.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS)
            var retval = await stockQuote.methods.getStockPrice(web3.utils.fromAscii(json["Global Quote"]["01. symbol"], json["Global Quote"]["05. price"], json["Global Quote"]["06. volume"])).call();
            console.log(retval);
            }

        }
            catch(error){
                console.log('fetch failed', error);
            }
    }*/
    handleChange(event) {
        this.setState({symbol: event.target.value});
        
}
    
      handleSubmit(event) {
        //alert('A stock was submitted: ' + this.state.symbol);
        try{
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
      catch(error){
        console.log('fetch failed', error);
    }
        event.preventDefault();
      }
    
    render(){
        return(
            <div>
                <h3>Stock Oracle</h3>
                <form onSubmit={this.handleSubmit}>
        <label>
          Stock Symbol:
          <input type="text" value={this.state.symbol} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      
      
                <h4>Stock Info from API</h4>
            Symbol: {this.state.symbol}<br/>
            Price: {this.state.price}<br/>
            Volume: {this.state.volume}<br/>
            
            </form>
            </div>

        );
    }
}
export default Stock;