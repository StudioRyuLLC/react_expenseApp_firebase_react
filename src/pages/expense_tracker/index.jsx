import {useState} from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '../../config/firebase_config';
import {useAddTransaction} from '../../hooks/useAddTransaction';
import {useGetTransactions} from '../../hooks/useGetTransactions';
import {useGetUserInfo} from '../../hooks/useGetUserInfo';
import {useNavigate} from 'react-router-dom';

//---

import './styles.css';

//------------------------------

export const ExpenseTracker = () => {

    const {addTransaction} = useAddTransaction();
    const {transactions, transactionTotals} = useGetTransactions();
    const {name, profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const {balance, income, expenses} = transactionTotals;

    //---

    const onSubmit = async (e) => {

        e.preventDefault();

        addTransaction({
            description,
            transactionAmount,
            transactionType
        });

        //clear the form...
        setDescription("");
        setTransactionAmount("");

    }//end onSubmit

    //---

    const signUserOut = async () =>{

        try{

            await signOut(auth);
            localStorage.clear();;
            navigate("/")

        }catch(err){

            console.log(err);

        }
        
    }//end signUserOut

    //---

    return (

        <>

        <div className="expense-tracker">

            <div className="container">

                <h1>{name}'s Expense Tracker</h1>

                <div className="balance">
                    <h3>Your Balance</h3>

                    {balance >= 0 ? (<h2>${balance}</h2>) : (<h2>-${balance*-1}</h2>)} 

                </div>

                <div className="summary">

                    <div className="income">
                        <h4>Income:</h4>
                        <p>${income}</p>
                    </div>

                    <div className="expenses">
                        <h4>Expenses:</h4>
                        <p>${expenses}</p>
                    </div>

                    <form className="container add-transaction" onSubmit={onSubmit}>

                        <input 
                        type="text" 
                        placeholder="Description" 
                        value={description}
                        required 
                        onChange={(e) => setDescription(e.target.value)}/>

                        <input 
                        type="number" 
                        placeholder="Amount" 
                        value={transactionAmount}
                        required 
                        onChange={(e) => setTransactionAmount(e.target.value)}/>

                        <label htmlFor="expense">Expense:</label>
                        <input 
                        id="expense" 
                        type="radio" 
                        value="expense" 
                        checked={transactionType === "expense"}
                        onChange={(e) => setTransactionType(e.target.value)}/>

                        <label htmlFor="income">Income:</label>
                        <input 
                        id="income" 
                        type="radio" 
                        value="income" 
                        checked={transactionType === "income"}
                        onChange={(e) => setTransactionType(e.target.value)}/>

                        <button type="submit" className="btn btn-primary"> 
                        <i className="fas fa-plus"></i> Add Transaction</button>

                    </form>
               
                </div>

            </div>
            
        </div>
        {profilePhoto && (
            <>
            <div className="container profile"> 
            <img className='profile-photo' src={profilePhoto} alt={name}/></div>
            <button className='btn btn-sm' onClick={signUserOut}>Sign out</button>
            </>
        )
        }

        <div className="transactions">

            <h3>Transactions</h3>

            <ul>

                {transactions.map((transaction) => {

                    const {description, transactionAmount, transactionType} = transaction;

                        return (
                            <li key={description}>
                                <h4> {description} </h4>
                                <p> ${transactionAmount} - <label style={{color:transactionType === "expense" ? "red" : "green"}}> {transactionType} </label> </p>
                            </li>
                        )

                })}

            </ul>

        </div>

        </>  
    );

};