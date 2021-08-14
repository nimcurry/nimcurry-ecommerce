import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import CheckOutPage from './pages/checkout/checkout.component';
import {Switch,Route,Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import Header from './components/header/header.component';
import SignInSignup from '../src/pages/sign-in-sign-up/sign-in-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/users.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import './App.css';



class App extends React.Component {
/*   constructor(){
    super();
    this.state = {
      currentUser: null
    }
  } */


  unsubscribeFromAuth=null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);  

        userRef.onSnapshot(snapShot => {
          /* this.setState( */
            setCurrentUser(
            {
            currentUser:{
              id: snapShot.id,
            ...snapShot.data()
          }
          
        });
        console.log(this.state);
      });
      }
      else{
        setCurrentUser(userAuth);
      }
/*       createUserProfileDocument(user);
      this.setState({currentUser: user}); */
      //console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <Switch>
        {/* <HomePage/> */}
        {/* one of the caveats of <Route/> component is that the access to the properties such as 
        history, link, match, locations is given only to the first componet that we pass which is Homeapage in this case */}
        {/* this properties could be passed to child components such as hatspages and directories, however this is called prop 
        tunnelling */}
        
        <Route exact ={true} path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/checkout' component={CheckOutPage}/>
        <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/'/>):(<SignInSignup/>)}/>
        </Switch>
      </div>
    );

  }
  
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
