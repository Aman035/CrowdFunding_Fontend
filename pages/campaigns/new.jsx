import React, {Component} from 'react';
import Layout from '../../components/layout';
import {Button, Form , Input ,Message} from 'semantic-ui-react';
import web3 from '../../web3';
import factory from '../../factory';
import Router from "next/router";

class NewCampaign extends Component{

    state ={
        minContribution : '',
        error : '',
        loading : false
    }

    onChange =(event)=>{
        this.setState({
            minContribution : event.target.value
        });
    }


    onSubmit  = async(event)=>{
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const amount = this.state.minContribution;
        this.setState({
            loading : true,
            error : ''
        })
        try{
            await factory.methods.deployCampaign(amount).send({
                from : accounts[0]
            });
            Router.push('/');

        }
        catch(err){
            this.setState({
                error : err.message
            })
        }
        this.setState({
            minContribution : '',
            loading : false
        })
    }


    render(){
        return(
            <div>
                <Layout>
                   <h3>Create A New Campaign</h3>
                   <Form error={!!this.state.error} onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label >
                                Min Contribution
                            </label>
                            <Input label="Wei" labelPosition="right" name='Wei' 
                                value={this.state.minContribution} 
                                onChange={this.onChange}/>
                        </Form.Field>
                        <Message error header='Oops!' content={this.state.error}/>
                        <Button loading={this.state.loading} secondary onClick={this.onSubmit}>Create</Button>
                   </Form>
                </Layout>
            </div>
        );
    }
}
export default NewCampaign;
