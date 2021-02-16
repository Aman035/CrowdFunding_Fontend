import React, {Component} from 'react';
import {Button, Form , Input ,Message} from 'semantic-ui-react';
import EachCampaign from '../eachCampaign';
import web3 from '../web3';
import Router from "next/router";
class Contribute extends Component{

    state ={
        contribution : '',
        error : '',
        loading : false
    }

    onChange =(event)=>{
        this.setState({
            contribution : event.target.value
        });
    }


    onSubmit  = async(event)=>{
        event.preventDefault();
        const campaign = EachCampaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({
            loading : true,
            error : ''
        })
        try{
            
            await campaign.methods.contribute().send({
                from : accounts[0],
                value : web3.utils.toWei(this.state.contribution)
            });

            Router.replace(`/campaigns/${this.props.address}`)

        }
        catch(err){
            this.setState({
                error : err.message
            })
        }
        this.setState({
            contribution : '',
            loading : false
        })
    }

    render(){
        return (
        <div>
            <Form error={!!this.state.error} onSubmit={this.onSubmit}>
                <Form.Field>
                    <label >
                        Amount of Contribute
                    </label>
                    <Input label="Ether" labelPosition="right" name='Ether' 
                        value={this.state.contribution} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Message error header='Oops!' content={this.state.error}/>
                <Button loading={this.state.loading} secondary onClick={this.onSubmit}>Contribute</Button>
            </Form>
        </div>
        );
    }
}
export default Contribute;