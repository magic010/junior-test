import React, { Component } from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error) {

return {hasErrored: true};

    }
   componentDidCatch(error,info){
       console.log(error);
       console.log(info);
   }
   render(){

if (this.state.hasErrored){

    return <div>Some error occurred</div>
}

return this.props.children;

   }
}
 
export default ErrorBoundary;