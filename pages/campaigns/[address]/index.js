import React ,{Component} from 'react';
import EachCampaign from '../../../eachCampaign';
import { Card,Button } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import Contribution from '../../../components/Contribute';
import { Grid } from 'semantic-ui-react';
import Link from 'next/link';
class Campaign extends Component{

    static async getInitialProps(props){
        const campaign = EachCampaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address : props.query.address,
            minContribution : summary[0],
            balance : summary[1],
            requestsCount : summary[2],
            approversCount : summary[3],
            manager : summary[4]
        };
    }

    renderCards(){
        const items = [
            {
                header: this.props.manager,
                description:
                    'The creator of the campaign who can withdraw money from the campaign.',
                meta: 'Manager of Campaign',
                style : {overflowWrap : 'break-word'}
            },
            {
              header: this.props.minContribution,
              description:
                'The minimum Contribution need to made to be a contibutor of the campaign',
              meta: 'Minimum Contribution in Wei',
            },
            {
              header: this.props.balance,
              description:
                'The total amount of money collected for the campaign',
              meta: 'Balance of Campaign (in Wei)',
            },
            {
                header: this.props.requestsCount,
                description:
                  'Total No. of Withdrawl requests of the campaign.',
                meta: 'Requests Count',
              },
              {
                header: this.props.approversCount,
                description:
                  'Total No. of Contributors to the project.',
                meta: 'No. of Contributors',
              },
          ]
          
          return <Card.Group items ={items}/>
          
    }
    
    render(){
        return(
            <Layout>
                <div>
                    <h3>Camapign Details</h3>
                    <Grid>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            <Link href={`/campaigns/${this.props.address}/requests`}>
                              <Button secondary style={{margin : "10px 0"}}>View Requests</Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Contribution address={this.props.address}/>
                        </Grid.Column>
                    </Grid>
                    
                    
                </div>
            </Layout>
        )
    }
}
export default Campaign;