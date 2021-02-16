import React from 'react';
import Layout from '../../../../components/layout';
import Link from 'next/link';
import Campaign from '../../../../eachCampaign';
import {Table,Button } from 'semantic-ui-react';
import RequestRow from '../../../../components/requestRow';
class Req extends React.Component{

    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = await Campaign(address);
        const requestCounts = await campaign.methods.getRequestsCount().call();
        const approvers = await campaign.methods.approversCount().call();

        const requests =  await Promise.all(Array(parseInt(requestCounts)).fill().map((element,index)=>{
            return campaign.methods.requests(index).call();
        }));

        return {address,requests ,requestCounts,approvers};
    }

    renderRow(){
        return this.props.requests.map((element,index)=>{
           return <RequestRow 
           key={index} 
           id = {index}
           request = {element} 
           address={this.props.address}
           approversCount = {this.props.approvers}
           />
        })
    }

    render(){

        const {Header,Row,HeaderCell,Body,Cell} = Table;
    return (
        <Layout>
            <h3>Requests</h3>
            <Link href={`/campaigns/${this.props.address}/requests/new`}>
                <Button secondary floated="right" style={{marginBottom : "20px"}}>Create New Request</Button>
            </Link>
            <Table>
                    <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                    </Header>
                    <Body>
                    {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCounts} requests.</div>
        </Layout>
    )}
    
}
export default Req;