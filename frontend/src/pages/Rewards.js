import React from 'react';

import MainNavbar from '../components/MainNavBar'

export default class RewardsPage extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
  
    componentDidMount() {
      console.log('I was triggered during componentDidMount')
    }
  
    render() {
        const { res, invalid, displayErrors } = this.state;
      return (
          <div>
          <MainNavbar className="main-navbar"></MainNavbar>
          <div className="container content">
          <h1>Axiom Prelaunch Rewards</h1>
            <div class="staticContent affiliates "><p>Axiom offers a complete affiliate program as well as rewards for top referrers.</p>
            <p>This prelaunch program offers the following benefits:</p>
            <ul>
            <li>You (the affiliate) receive a percentage of commissions paid by your referrals when we go live.</li>
            </ul>
            <p><a href="/terms">View the Complete Terms</a>.</p>
            <h4 id="Referred-User-Benefits"><a class="header-anchor" href="#Referred-User-Benefits">Referred User Benefits</a></h4>
            <p>Users who have signed up with a valid affiliate link will receive a 10% fee discount for 6 months of orders placed through order routing.</p>
            <p>Fee structures may be different per contract; the discount will apply on all products. </p> 
            <h4 id="Affiliate-Payouts"><a class="header-anchor" href="#Affiliate-Payouts">Affiliate Payouts</a></h4>
            <p>Affiliates receive a percentage of total commissions paid by the people they have referred, paid in the available asset of their choosing
            into their Axiom wallet. Each referral generates affiliate commissions for the lifetime of the account.
            The percentage of commissions they receive depend on the turnover of the account’s referrals.</p>
            <p>Once referred to the site, if a user completes registration within 7 days, the affiliate receives credit for the account.</p>
            <h4 id="Affiliate-Payout-Structure"><a class="header-anchor" href="#Affiliate-Payout-Structure">Affiliate Payout Structure</a></h4>
            <p>The amount of commission a user receives for referring others follows a tiered schedule as follows:</p>
            <table class="table table-bordered table-striped">
            <thead>
            <tr>
            <th>Total Referred Bitcoin Notional Traded</th>
            <th>% of Commissions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>&gt; Tier 1</td>
            <td>10%</td>
            </tr>
            <tr>
            <td>&gt; Tier 2</td>
            <td>15%</td>
            </tr>
            <tr>
            <td>&gt; Tier 3</td>
            <td>20%</td>
            </tr>
            </tbody>
            </table>
            
            <h4 id="Affiliate-Payout-Structure"><a class="header-anchor" href="#Affiliate-Payout-Structure">Top 10 referrers get remunirated with stock</a></h4>
            <p>The top 10 referrers will be elegible for an ownership stake amounting to 150000 shares in Axiom </p>
          </div>
          </div>
          </div>
      );
    }
  }
  