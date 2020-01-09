import React from 'react';

import MainNavbar from '../components/MainNavBar'

export default class AboutPage extends React.Component {
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
          <h1>About Axiom</h1>
            <div class="staticContent affiliates "><p>BitMEX offers a complete affiliate program.</p>
            <p>This program offers the following benefits:</p>
            <ul>
            <li>You (the affiliate) receive a percentage of commissions paid by your referrals.</li>
            <li>Your referrals receive a limited-term fee discount.</li>
            </ul>
            <p><a href="/app/affiliateToS">View the Complete Terms</a>.</p>
            <h4 id="Referred-User-Benefits"><a class="header-anchor" href="#Referred-User-Benefits">Referred User Benefits</a></h4>
            <p>Users who have signed up with a valid affiliate link will receive a 10% fee discount for 6 months.</p>
            <p>Fee structures may be different per contract; the discount will apply on all contracts. See the <a href="/app/fees">Fees Page</a> to view
            the fee structure for a particular contract.</p>
            <h4 id="Affiliate-Payouts"><a class="header-anchor" href="#Affiliate-Payouts">Affiliate Payouts</a></h4>
            <p>Affiliates receive a percentage of total commissions paid by the people they have referred, paid in Bitcoin
            into their BitMEX wallet. Each referral generates affiliate commissions for the lifetime of the account.
            The percentage of commissions they receive depend on the Bitcoin turnover of the account’s referrals.</p>
            <p>Once referred to the site, if a user completes registration within 7 days, the affiliate receives credit for the account.</p>
            <h4 id="Affiliate-Payout-Structure"><a class="header-anchor" href="#Affiliate-Payout-Structure">Affiliate Payout Structure</a></h4>
            <table class="table table-bordered table-striped">
            <thead>
            <tr>
            <th>Total Referred Bitcoin Notional Traded</th>
            <th>% of Commissions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>&gt; 0 XBT</td>
            <td>10%</td>
            </tr>
            <tr>
            <td>&gt; 1,000 XBT</td>
            <td>15%</td>
            </tr>
            <tr>
            <td>&gt; 10,000 XBT</td>
            <td>20%</td>
            </tr>
            </tbody>
            </table>
            <p>Payouts are made daily at 12:01 UTC.</p>
          </div>
          </div>
          </div>
      );
    }
  }
  