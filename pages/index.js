import React, {Component} from 'react';
import { Card , Button} from 'semantic-ui-react';
import factory from '../factory';
import Layout from '../components/layout';
import Link from 'next/link';

class Campaign extends Component{
  //specific to next for server side calling or fetching data
  //this thing if called by componentdidMount will not be called on server 
  static async getInitialProps(){
    const campaign = await factory.methods.getDeplyedCampaigns().call();
    return {campaign : campaign};
  }

  renderCampaigns(){
    const items = this.props.campaign.map(each=>{
      return({
      header : each,
      description : <Link href={`/campaigns/${each}`}>View Campaign</Link>,
      fluid : true
      })
    })

    return <Card.Group items ={items}/>
  }

    render(){
      return(
      <Layout>
        <div>
        <h3>Open Campaigns</h3>
        <Link href='/campaigns/new'>
          <Button floated='right' content='New Campaign' icon='add circle' secondary/>
        </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default Campaign;