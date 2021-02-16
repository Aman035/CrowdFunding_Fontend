import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../web3';
import Campaign from '../eachCampaign';
import Router from "next/router";

class RequestRow extends React.Component{

    Approve = async()=>{
        const accounts = await web3.eth.getAccounts();
        const campaign = await Campaign(this.props.address);
        await campaign.methods.approveRequest(this.props.id).send({
            from : accounts[0]
        });
        Router.replace(`/campaigns/${this.props.address}/requests`)
    }

    Finalize = async()=>{
        const accounts = await web3.eth.getAccounts();
        const campaign = await Campaign(this.props.address);
        await campaign.methods.finalizeRequest(this.props.id).send({
            from : accounts[0]
        });
        Router.replace(`/campaigns/${this.props.address}/requests`)
    }

    render(){
        const {Row ,Cell} = Table;
        const ready = this.props.request.approvalCount > this.props.approversCount/2;
        return (
            <Row disabled={this.props.request.complete} positive={ready && !this.props.request.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value,'ether')} Eth</Cell>
                <Cell>{this.props.request.recipient}</Cell>
                <Cell>{this.props.request.approvalCount}/{this.props.approversCount}</Cell>
                <Cell>
                {this.props.request.complete ? null :
                    <Button color = "green"  basic onClick={this.Approve}>Approve</Button>
                }
                </Cell>
                <Cell>
                {this.props.request.complete ? null :
                    <Button color="teal" basic onClick={this.Finalize}>Finalize</Button>
                }
                </Cell>
            </Row>
        )
    }
}
export default RequestRow;