import React from 'react';
import Layout from '../../../../components/layout';
import {Link} from 'next/link';
import {Button, Form , Input ,Message} from 'semantic-ui-react';
import Campaign from '../../../../eachCampaign';
import web3 from '../../../../web3';
import Router from "next/router";
class NewRequest extends React.Component{
    state ={
        description : '',
        value : '',
        receipient : '',
        error : '',
        loading : ''
    }

    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }

    onSubmit = async event=>{
        event.preventDefault();
        const campaign = await Campaign(this.props.address);
        this.setState({
            loading : true,
            error : ''
        })

        try{
            const accounts = await web3.eth.getAccounts();
            const amount  = await web3.utils.toWei(this.state.value,'ether');
            await campaign.methods.createRequests(this.state.description,
                amount ,
                this.state.receipient).send({
                from : accounts[0]
            })
            Router.push(`/campaigns/${this.props.address}/requests`);
        }
        catch(err){
            this.setState({
                error : err.message
            })
        }
        this.setState({
            description : '',
            value : '',
            receipient : '',
            loading : false
        })

    }

    render(){
        return(
            <Layout>
                <h3>Create New Request</h3>
                <Form error={!!this.state.error} onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label >
                                Description
                            </label>
                            <Input 
                                value={this.state.description} 
                                onChange={(event)=>{this.setState({description : event.target.value})}}/>
                        </Form.Field>
                        <Form.Field>
                            <label >
                                Value in Ethers
                            </label>
                            <Input label="Ether" labelPosition="right" name='Ether' 
                                value={this.state.value} 
                                onChange={(event)=>{this.setState({value : event.target.value})}}/>
                        </Form.Field>
                        <Form.Field>
                            <label >
                                Receipient
                            </label>
                            <Input 
                                value={this.state.receipient} 
                                onChange={(event)=>{this.setState({receipient : event.target.value})}}/>
                        </Form.Field>
                        <Message error header='Oops!' content={this.state.error}/>
                        <Button loading={this.state.loading} secondary onClick={this.onSubmit}>Create</Button>
                   </Form>
            </Layout>
        )
    }
}
export default NewRequest;