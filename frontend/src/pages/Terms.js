import React from 'react';

import MainNavbar from '../components/MainNavBar'

export default class TermsPage extends React.Component {
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
            <h1>Axiom Terms</h1>
            <div class="staticContent terms "><p><em>These terms were prepared in the English language and the English language version shall prevail in the event of any conflict, discrepancy or ambiguity between translations.</em></p>
            <p></p><div class="table-of-contents"><ul><li><a href="#1-Access-Conditions">1. Access Conditions</a></li><li><a href="#2-Fees">2. Fees</a></li><li><a href="#3-Intellectual-Property-Rights">3. Intellectual Property Rights</a></li><li><a href="#4-Privacy-Notice">4. Privacy Notice</a></li><li><a href="#5-Third-Party-Websites">5. Third Party Websites</a></li><li><a href="#6-Warranties-and-Representations">6. Warranties and Representations</a></li><li><a href="#7-Accuracy-and-Availability-of-Services">7. Accuracy and Availability of Services</a></li><li><a href="#8-Indemnification">8. Indemnification</a></li><li><a href="#9-Limitation-of-Liability">9. Limitation of Liability</a></li><li><a href="#10-Calculations">10. Calculations</a></li><li><a href="#11-Termination-and-Remedies-for-Breach-of-these-Terms-by-You">11. Termination and Remedies for Breach of these Terms by You</a></li><li><a href="#12-Confidentiality">12. Confidentiality</a></li><li><a href="#13	Absence-of-Waiver">13.	Absence of Waiver</a></li><li><a href="#14-Force-Majeure">14. Force Majeure</a></li><li><a href="#15-Survival">15. Survival</a></li><li><a href="#16-Governing-Law">16. Governing Law</a></li><li><a href="#17-Dispute-Resolution">17. Dispute Resolution</a></li></ul></div><p></p>
            <p>BitMEX (website:&nbsp;<a href="https://www.BitMEX.com">https://www.BitMEX.com</a>) is a Bitcoin-based trading platform that is wholly owned by HDR Global Trading Limited. HDR Global Trading Limited (hereinafter referred to as <strong>“HDR”</strong>) was incorporated under the International Business Companies Act of 1994 of the Republic of Seychelles with a company number of 148707.</p>
            <p>These terms of services, together with any other addenda, terms and conditions or documents expressly incorporated herein constitute the entire agreement between the parties (together, the <strong>“Terms”</strong>). In the event of any inconsistency between these terms of services and any of the other addenda, terms and documents, the provisions of these terms of services shall prevail to the extent of such inconsistency. All other information provided on the Trading Platform or oral/written statements made are excluded from these Terms and do not constitute a legal agreement between the parties. Use of the Trading Platform and the Services is governed by these Terms.</p>
            <p>By accessing, viewing or downloading information from the Trading Platform and using the Services provided by the HDR Group, you acknowledge that you have read and considered, and you understand and unconditionally agree to be bound, by these Terms. HDR may, at any time, without notice, amend the Terms. You agree to continue to be bound by any such amended Terms and that HDR has no obligation to notify you of such amendments. You acknowledge that it is your responsibility to check these Terms periodically for changes and that your continued use of the Trading Platform and Services offered by the HDR Group following the posting of any changes to the Terms indicates your acceptance of any such changes.</p>
            <p>The Trading Platform and the copyright in all text, graphics, images, software and any other materials on the Trading Platform are owned by HDR, including all trademarks and other Intellectual Property Rights in respect of materials and Services on the Trading Platform. Materials on the Trading Platform may only be used for personal use and non-commercial purposes.</p>
            <p>You may display on a computer screen or print extracts from the Trading Platform for the above-stated purposes only provided that you retain any copyright and other proprietary notices or any of HDR’s trademarks or logos, as shown on the initial printout or download without alteration, addition or deletion. Except as expressly stated herein, you may not without HDR’s prior written permission alter, modify, reproduce, distribute or use in any other commercial context any materials from the Trading Platform.</p>
            <p>You acknowledge that ‘BitMEX’ and the BitMEX logo are trademarks of HDR. You may reproduce such trademarks without alteration on material downloaded from the Trading Platform to the extent authorised above, but you may not otherwise use, copy, adapt or erase them.</p>
            <p>You shall not in any circumstance obtain any rights over or in respect of the Trading Platform (other than rights to use the Trading Platform pursuant to these Terms and any other terms and conditions governing a particular service or section of the Trading Platform) or hold yourself out as having any such rights over or in respect of the Trading Platform.</p>
            <p>You are not allowed to access or use the Services or the Trading Platform if you are located, incorporated or otherwise established in, or a citizen or resident of: (i) the United States of America, the province of Québec in Canada, the Hong Kong Special Administrative Region of the People’s Republic of China, the Republic of Seychelles, Bermuda, Cuba, Crimea and Sevastopol, Iran, Syria, North Korea or Sudan; (ii) any state, country or other jurisdiction that is embargoed by the United States of America; (iii) a jurisdiction where it would be illegal according to Applicable Law for you (by reason of your nationality, domicile, citizenship, residence or otherwise) to access or use the Services or the Trading Platform; or (iv) where the publication or availability of the Services or the Trading Platform is prohibited or contrary to local law or regulation, or could subject any member of the HDR Group to any local registration or licensing requirements (together, the <strong>“Restricted Jurisdictions”</strong>). HDR may, in its sole discretion, implement controls to restrict access to the Services or the Trading Platform in any of the Restricted Jurisdictions. If HDR determines that you are accessing the Services or the Trading Platform from any Restricted Jurisdiction, or have given false representations as to your location of incorporation, establishment, citizenship or place of residence, HDR reserves the right to close any of your accounts immediately and liquidate any open positions.</p>
            <p><strong><em><strong>Definitions</strong></em></strong></p>
            <p>In these Terms:</p>
            <p><strong>"APIs"</strong> means Application Programming Interfaces;</p>
            <p><strong>"Applicable Law"</strong> means all civil and common laws, statutes, subordinate legislation, treaties, regulations, directives, decisions, by-laws, ordinances, circulars, codes, orders, notices, demands, decrees, injunctions, resolutions, rules and judgments of any government, quasi-government, statutory, administrative or regulatory body, court, agency or association by which any member of the HDR Group or you are bound in any jurisdiction applicable to the receipt or performance of the Services.</p>
            <p><strong>"BitMEX Mobile Application"</strong> means the mobile trading application developed, published and distributed by the HDR Group (as updated from time to time).</p>
            <p><strong>"BitMEX Testnet Platform"</strong> means the Testnet coin-based trading platform operated by HDR which is largely based upon the Trading Platform and is accessible at the following webpage: <a href="https://testnet.bitmex.com/">https://testnet.bitmex.com/</a>.</p>
            <p><strong>"HDR Group"</strong> means HDR and its subsidiaries from time to time.</p>
            <p><strong>"Intellectual Property Rights"</strong> means any registered or unregistered design rights, patents, copyright, database rights, data protection rights, trade marks, service marks, logos, trade names, rights in domain names, rights in undisclosed or confidential information (such as know-how, trade secrets and inventions (whether or not patentable)) moral rights and any other similar intellectual or industrial property rights (whether registered or not) and applications for such rights as may exist anywhere in the world.</p>
            <p><strong>"Member"</strong> means any current registered user of the Trading Platform.</p>
            <p><strong>"Services"</strong> means websites, applications and any services provided by any member of the HDR Group, including:</p>
            <ul>
            <li>a)	the Trading Platform and the BitMEX Testnet Platform;</li>
            <li>b)	any downloadable material from HDR’s websites;</li>
            <li>c)	any information, content or other material published or provided by any member of the HDR Group in any way with respect to any subject matter (including any research materials, market data or blogs); and</li>
            <li>d)	any features, content or services from any person that may be ancillary to any of the above.</li>
            </ul>
            <p><strong>"Trading Platform"</strong> means the Bitcoin-based trading platform on <a href="https://www.bitmex.com">https://www.bitmex.com</a> and subdomains, mobile applications (including the BitMEX Mobile Application), APIs and other media owned by the HDR Group relating to that trading platform.</p>
            <h3 id="1-Access-Conditions"><a class="header-anchor" href="#1-Access-Conditions">1. Access Conditions</a></h3>
            <p><strong>1.1</strong>: When accessing and using the Service, you must:</p>
            <ul>
            <li>
            <p>a) not carry out any activity that: (i) involves proceeds from any illegal or unlawful activity (including activities relating to cryptocurrency tumblers, darknet markets, money laundering or terrorism financing); (ii) publishes, distributes or disseminates any illegal or unlawful material or information; or (iii) otherwise violates, or could violate, any Applicable Law;</p>
            </li>
            <li>
            <p>b) not attempt to undermine the security or integrity of the HDR Group’s computing systems or networks or, where the Services are hosted by a third party, that third party’s computing systems and networks;</p>
            </li>
            <li>
            <p>c) not use, or misuse, the Services in any way which may impair the functionality of the Services or Trading Platform, or other systems used to deliver the Services or impair the ability of any other user to use the Services or Trading Platform;</p>
            </li>
            <li>
            <p>d) not attempt to gain unauthorised access to the computer system on which the Trading Platform is hosted or to any materials other than those to which you have been given express permission to access;</p>
            </li>
            <li>
            <p>e) not transmit or input into the Trading Platform any files that may damage any other person’s computing devices or software; content that may be offensive; or material or data in violation of any law (including data or other material protected by copyright or trade secrets which you do not have the right to use);</p>
            </li>
            <li>
            <p>f) not attempt to modify, copy, adapt, reproduce, disassemble, decompile or reverse-engineer any computer programs used to deliver the Services or to operate the Trading Platform except as is strictly necessary to use either of them for normal operation;</p>
            </li>
            <li>
            <p>g) ensure that all usernames and passwords required to access the Trading Platform are kept secure and confidential; and</p>
            </li>
            <li>
            <p>h) immediately notify HDR of any unauthorised use of your password(s) or any other breach of security and HDR will reset your password(s) upon such notification.</p>
            </li>
            </ul>
            <p><strong>1.2</strong>: Use of the Services may be subject to limitations, including but not limited to transaction volumes and the number of calls permitted to be made against the relevant application programming interface. Any such limitations will be advised.</p>
            <p><strong>1.3</strong>: By accessing the Trading Platform, using the Services or registering as a Member, you represent, warrant and undertake that:</p>
            <ul>
            <li>
            <p>a) you have accepted the Terms;</p>
            </li>
            <li>
            <p>b) you are at least 18 years of age and have the capacity to accept the Terms;</p>
            </li>
            <li>
            <p>c) you are the legal owner (or an appropriately authorised representative of the legal owner) of the funds you add to your account with HDR and that the same funds derive from a legitimate source;</p>
            </li>
            <li>
            <p>d) your use of the Services does not constitute a breach of Applicable Law;</p>
            </li>
            <li>
            <p>e) you are aware of the risks in using the Services provided by the HDR Group and have the necessary experience and knowledge to understand the risks involved in relation to each Service provided by the HDR Group. These risks include the high volatility risk of Bitcoin itself, and that you may lose all of the funds in your trading account if the market moves against you;</p>
            </li>
            <li>
            <p>f) you acknowledge and agree that the Services should only be used by you if you:</p>
            <ul>
            <li>i) have knowledge and experience in highly volatile markets;</li>
            <li>ii) are trading with Bitcoin you can afford to lose; and</li>
            <li>iii) have a high risk tolerance;</li>
            </ul>
            </li>
            <li>
            <p>g) you will not be involved or initiate any form of market manipulation, including spoofing orders or otherwise;</p>
            </li>
            <li>
            <p>h) the information or documents you provide as part of any ID verification process are correct, genuine and up to date;</p>
            </li>
            <li>
            <p>i) any Bitcoin withdrawal address you provide is your own and that you have full control over this address;</p>
            </li>
            <li>
            <p>j) you are not allowed to access or use the Services if you are located in, incorporated or otherwise established in, or a citizen or resident of any Restricted Jurisdiction, and that HDR reserves the right to close any of your accounts immediately and liquidate any open positions if you are accessing the Services from any Restricted Jurisdiction or have given false representations as to your location, place of incorporation or establishment, citizenship or place of residence;</p>
            </li>
            <li>
            <p>k) you have not; (i) violated; (ii) been fined, debarred, sanctioned, the subject of economic sanctions-related restrictions, or otherwise penalised under; (iii) received any oral or written notice from any government concerning actual or possible violation by you under; or (iv) received any other report that you are the subject or target of sanctions, restrictions, penalties, or enforcement action or investigation under, any Applicable Law (including but not limited to anti-money laundering laws, counterterrorism financing laws, anti-corruption laws or economic sanctions laws); and</p>
            </li>
            <li>
            <p>l) neither you nor any of your affiliates is: (i) itself, or owned or controlled by, a sanctioned person; (ii) involved in any transaction, transfer, or conduct, whether or not by using or receiving the Services or the Trading Platform, that is likely to result in you or your affiliates becoming a sanctioned person; or (iii) located in, incorporated or otherwise established in, or a citizen or resident of, a Restricted Jurisdiction.</p>
            </li>
            </ul>
            <p><strong>1.4</strong>: You can open an initial account by providing your email address and full name.</p>
            <p><strong>1.5</strong>: HDR reserves the right at any time to verify your identity for the purposes of complying with the Seychelles’ Anti-Money Laundering Act 2006 or any other Applicable Law.</p>
            <p><strong>1.6</strong>: We impose certain trading limits before you are required to conduct Customer Due Diligence (CDD). You agree to cooperate with us in this process and will provide all documentation/information that we may require to satisfy ourselves of your identity and the purpose of the business relationship.</p>
            <p><strong>1.7</strong>: You agree that any trading or other instructions received or undertaken through your account are deemed to be final and conclusive, and that HDR may act upon such instructions without any liability or responsibility attached to it. In connection with any APIs offered on or through the Trading Platform, you acknowledge and agree that:</p>
            <ul>
            <li>a) HDR is permitted to share your data with any third parties that possess your unique API key, and</li>
            <li>b) HDR may rely and act upon the instructions (including, but not limited to, instructions relating to order placement or the closing of positions) of any third parties that possess your unique API key, and the HDR Group accepts no responsibility or liability for any loss arising from the foregoing.</li>
            </ul>
            <p><strong>1.8</strong>: We may freeze any account in the event that we suspect or have reason to believe you are engaged in suspicious trading or other activity or have breached any of the above warranties or other provisions of these Terms. This may result in the unwinding of any trades you have entered into. We expressly exclude any losses or profits you would have made as a result of us closing your trade positions early or you not being able to trade on the Trading Platform and you agree to indemnify us completely against any third party action resulting from your conduct or us having to close your positions early. Whilst your account is frozen we will conduct an investigation and may require you to cooperate with our enquiries. During the investigation stage you will not be able to make deposits or withdrawals to your account nor will you be able to trade. At the end of the investigation we may, at our own discretion, decide to close your account for which we are not required to provide you with any reasons for the same.</p>
            <p><strong>1.9</strong>: We reserve the right at our own discretion to close your account at any time.</p>
            <p><strong>1.10</strong>: By using the Services, you accept that HDR reserves the right to liquidate any trades at any time regardless of the profit or loss position.</p>
            <p><strong>1.11</strong>: It is your responsibility entirely to provide us with correct details including your withdrawal address. We accept no liability resulting in you not receiving the Bitcoin withdrawn due to you providing incorrect or out-of-date details. It is also your responsibility to ensure that instructions, orders or transactions sent to HDR are well-formatted, clear and denominated in the correct currency. HDR excludes all liability for any incorrect transactions, including, but not limited to, Litecoin sent to Bitcoin addresses.</p>
            <p><strong>1.12</strong>: It is our responsibility to maintain an orderly market and as such we may at our own discretion halt trading on the Trading Platform due to market disruption or other relevant external events. We exclude all liability for any claimed losses or profits lost as a result of us halting trading.</p>
            <h3 id="2-Fees"><a class="header-anchor" href="#2-Fees">2. Fees</a></h3>
            <p><strong>2.1</strong>: You acknowledge and agree that, by using the Services, fees will apply.</p>
            <p><strong>2.2</strong>: Details of these fees are set forth on this webpage: <a href="/app/fees">https://www.bitmex.com/app/fees</a>.</p>
            <p><strong>2.3</strong>: HDR has the right to revise and update the applicable fees at any time at its sole discretion. Any such revision or updates to the fees will apply prospectively to any Services (including any transactions on the Trading Platform) that take place following the effective time that the fee revision or update is published on the Trading Platform.</p>
            <h3 id="3-Intellectual-Property-Rights"><a class="header-anchor" href="#3-Intellectual-Property-Rights">3. Intellectual Property Rights</a></h3>
            <p><strong>3.1</strong>: All Intellectual Property Rights relating to the Trading Platform, all the material used on the Trading Platform and the Services including, but not limited to, design, structure, layouts, graphical images and underlying source code belong to the HDR Group. All rights are reserved.</p>
            <p><strong>3.2</strong>: You acknowledge that, except as otherwise agreed between the parties in writing, all Intellectual Property Rights of the HDR Group in the Trading Platform and the Services shall remain with the HDR Group.</p>
            <p><strong>3.3</strong>: You are not granted any right to use, and may not use, any of the HDR Group’s Intellectual Property Rights other than as set out in these Terms and subject to the following conditions:</p>
            <ul>
            <li>
            <p>a) you may only view and use the Services and the Trading Platform (or any part of it or its contents) for your own personal use and may not copy, reproduce, republish, upload, repost, modify, transmit, distribute or otherwise use the Services and the Trading Platform (or any part of it or its content) in any way for non-personal, public or commercial use without the prior written consent of HDR. All restrictions relating to use of the Services and the Trading Platform in these Terms shall apply to data available through any APIs;</p>
            </li>
            <li>
            <p>b) you may not remove or modify any copyright, trademark or other proprietary notices that have been placed in any part of the Services; and</p>
            </li>
            <li>
            <p>c) you may not use any data mining, robots or similar data-gathering or extraction methods.</p>
            </li>
            </ul>
            <p><strong>3.4</strong>: By submitting your content directly or indirectly to or through the Trading Platform in any way, including, but not limited to, blogs, message boards, forums and APIs (whether or not submitted through a third party), you grant the HDR Group a royalty-free, perpetual, irrevocable, transferable, sublicensable, non-exclusive right and licence to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, communicate to the public, perform and display all of your content (in whole or in part) worldwide and to incorporate it in other works in any form, media, or technology now known or later developed, for the full term of any rights that may exist in such content. The HDR Group shall be the sole owner of any derivative work produced by the HDR Group based on, or in any way connected with, your content, and shall have the right to use such derivative work for any purpose, commercial or otherwise, without any further obligation to you. You also permit any other users of the Trading Platform to access, display, view, store and reproduce such content for personal use. You waive (and to the extent you cannot waive, agree irrevocably not to assert) any and all moral rights to which you may be entitled anywhere in the world in respect of such content. HDR has the right, but not the obligation, to monitor all conduct and content submitted to or through the Trading Platform, and may in its sole discretion: (i) refuse to publish, remove or modify content or disable access to content that it considers breaches these Terms; or (ii) suspend or discontinue your opportunity to submit, post or upload content.</p>
            <p><strong>3.5</strong>: By submitting any content to the Trading Platform you warrant that you are entitled to, and have all necessary Intellectual Property Rights over, that content to submit it on the Trading Platform in accordance with these Terms.</p>
            <p><strong>3.6</strong>: HDR reserves the right to disclose your identity to any third party who claims that any content posted or uploaded by you to the Trading Platform constitutes a violation of their Intellectual Property Rights or of their right to privacy.</p>
            <h3 id="4-Privacy-Notice"><a class="header-anchor" href="#4-Privacy-Notice">4. Privacy Notice</a></h3>
            <p><strong>4.1</strong>: For more details about HDR’s privacy and data protection practices, please refer to our Privacy Notice available at the following webpage: <a href="/app/privacyPolicy">https://www.bitmex.com/app/privacyPolicy</a>.</p>
            <h3 id="5-Third-Party-Websites"><a class="header-anchor" href="#5-Third-Party-Websites">5. Third Party Websites</a></h3>
            <p><strong>5.1</strong>: HDR links to third party websites that are not affiliated or associated with the HDR Group (although branding, advertisements or links relating to the Trading Platform or any Services may appear on these websites) and HDR may send e-mail messages to you containing advertisements or promotions including links to third parties. The HDR Group makes no representation as to the quality, suitability, functionality or legality of the material on third party websites that are linked to, or to any goods and services available from such websites. The material is only provided for your interest and convenience. The HDR Group does not monitor or investigate such third party websites and the HDR Group accepts no responsibility or liability for any loss arising from the content or accuracy of this material and any opinion expressed in the material should not be taken as an endorsement, recommendation or opinion of any member of the HDR Group.</p>
            <p><strong>5.2</strong>: Under no circumstances are you to create a hyperlink to any of the pages on the Trading Platform, unless HDR provides you with its prior consent to do so. If you do create a link to any of the pages on the Trading Platform, you acknowledge that you are responsible for all direct or indirect consequences of the link, and you indemnify each member of the HDR Group immediately upon demand for all loss, liability, costs or expense arising from or in connection with the link.</p>
            <h3 id="6-Warranties-and-Representations"><a class="header-anchor" href="#6-Warranties-and-Representations">6. Warranties and Representations</a></h3>
            <p><strong>6.1</strong>: You represent, warrant and undertake that:</p>
            <ul>
            <li>
            <p>a) you are authorised to access and use the Services and the Trading Platform. In particular, each jurisdiction where you are located in, incorporated or otherwise established in, or of which you are a citizen or resident, allows you to utilise the Services and the Trading Platform;</p>
            </li>
            <li>
            <p>b) if you are using the Trading Platform on behalf of or for the benefit of any person or organisation, you must be authorised to do so. The relevant person or organisation will be liable for your actions, including any breach of these Terms; and</p>
            </li>
            <li>
            <p>c) your use of the Trading Platform and the Services is at your own risk. You agree that the HDR Group is not liable for any damage or harm arising out of your use of the Trading Platform and Services.</p>
            </li>
            </ul>
            <p><strong>6.2</strong>: You acknowledge and agree that:</p>
            <ul>
            <li>
            <p>a) the information provided on the Trading Platform is for general information purposes only and is given in good faith. However, the information is selective and HDR may not verify all information, which may not be complete or accurate for your purposes and should not be relied upon without further enquiry. The information and Services should not be construed as an offer or a recommendation to trade or engage the Services provided by the HDR Group in a particular manner and the information does not take into account the investment objectives or financial situation of any particular person; and</p>
            </li>
            <li>
            <p>b) HDR does not warrant that the use of the Trading Platform will be uninterrupted or error-free. Amongst other things, the operation and availability of the systems used for accessing the Trading Platform, including public telephone services, computer networks and the internet, can be unpredictable and may from time to time interfere with or prevent access to the Trading Platform. HDR is not in any way responsible for any such interference that prevents your access or use of the Trading Platform and the Services.</p>
            </li>
            </ul>
            <p><strong>6.3</strong>: HDR has a trading arm that, amongst other things, transacts in products traded on the Trading Platform. The trading arm primarily trades as a market-maker. The trading arm is organised to be separate and distinct from the business of the Trading Platform. Specifically, no front office personnel are shared between the trading arm and the Trading Platform, the trading arm’s staff are physically separated from the Trading Platform’s staff while performing trades, and the trading arm does not have access to any order flow, execution, customer or other information of the Trading Platform on terms that are not otherwise available to any other platform user. In addition, unless otherwise set forth in the terms of a specific product of HDR, the trading arm receives access and trading privileges only on the same terms as are available to any other user.</p>
            <p><strong>6.4</strong>: You warrant and represent that you are acquiring the right to access and use the Trading Platform and agreeing to these Terms for the purposes of a business and that, to the maximum extent permitted by law, any statutory consumer guarantees or legislation intended to protect non-business consumers in any jurisdiction does not apply to the supply of the Trading Platform or these Terms.</p>
            <h3 id="7-Accuracy-and-Availability-of-Services"><a class="header-anchor" href="#7-Accuracy-and-Availability-of-Services">7. Accuracy and Availability of Services</a></h3>
            <p><strong>7.1</strong>: You acknowledge, agree and understand that none of the Services amount to investment advice or any marketing, or promotion or offer of any product or investment to you or any third party. You are solely responsible for any losses, damages or costs resulting from your reliance on any data or information that the HDR Group may provide in connection with your use of the Services. You will make your own independent decision to access or use the Services.</p>
            <p><strong>7.2</strong>: To the maximum extent permitted under Applicable Law, the Services and any product, service or other item provided by or on behalf of the HDR Group are provided on an “as is” and “as available” basis and the HDR Group expressly disclaims, and you waive, any and all other warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, title or non-infringement or warranties arising from course of performance, course of dealing or usage in trade. Without limiting the foregoing, the HDR Group does not represent or warrant that the Services are accurate, complete, reliable, current or error-free, or free of viruses or other harmful components.</p>
            <p><strong>7.3</strong>: HDR shall make reasonable efforts to ensure that the Services are available to you. However, access to the Services may be disrupted from time to time due to necessary maintenance, technical issues, network and system overloads or events outside of HDR’s control. HDR will use commercially reasonable efforts to avoid downtime of the Services during anticipated peak hours, but assumes no liability (whether for trading-related losses or otherwise) if the Services or any part thereof are unavailable at any time or for any period.</p>
            <p><strong>7.4</strong>: You acknowledge and agree that:</p>
            <ul>
            <li>
            <p>a) the HDR Group shall not have any liability, contingent or otherwise, to you or to any third parties, for the correctness, quality, accuracy, security, completeness, reliability, performance, timeliness, pricing or continued availability of the Services (including the Trading Platform) or for delays or omissions of the Services, or for the failure of any connection or communication service to provide or maintain your access to the Services, or for any interruption in or disruption of your access or any erroneous communications between the HDR Group and you, regardless of cause;</p>
            </li>
            <li>
            <p>b) the HDR Group shall not have any liability or be responsible in any way for your use of the internet to connect to the Services or any technical problems, system failures, malfunctions, communication line failures, high internet traffic or demand, related issues, security breaches or any similar technical problems or defects experienced. You shall be responsible for any fees incurred in order to connect to the internet for the purpose of using or accessing the Services;</p>
            </li>
            <li>
            <p>c) you are solely responsible for your own hardware used to access the Services and are solely liable for the integrity and proper storage of any data associated with the Services that is stored on your own hardware. You are responsible for taking appropriate action to protect your hardware and data from viruses and malicious software, and any inappropriate material. Except as provided by Applicable Law, you are solely responsible for backing up and maintaining duplicate copies of any information you store or transfer through our Services. The HDR Group will not be liable to you in the event that your hardware fails, is damaged or destroyed or any records or data stored on your hardware are corrupted or lost for any reason.</p>
            </li>
            </ul>
            <p><strong>7.5</strong>: You must immediately notify HDR in the event that you become aware of any of the Services malfunctioning or a trading error occurring or if you otherwise experience any material malfunction or other connectivity problem that adversely affects your access to or use of any Services.</p>
            <p><strong>7.6</strong>: You acknowledge, agree and understand that if you travel to any Restricted Jurisdiction, our Services may not be available and your access to our Services may be blocked. You acknowledge that this may impact your ability to trade on the Trading Platform or monitor any existing orders or open positions or otherwise use the Services. You must not attempt in any way to circumvent any such restriction, including by use of any virtual private network to modify your internet protocol address.</p>
            <p><strong>7.7</strong>: You acknowledge and agree that there are a series of inherent risks with the use of mobile trading technology such as the BitMEX Mobile Application including, but not limited to, latency in the prices provided. The HDR Group shall not be liable for any and all circumstances in connection with your use of the BitMEX Mobile Application in which you experience a delay in price quotation or an inability to trade caused by network circuit transmission problems or any other problems outside our direct control, which include but are not limited to the strength of the mobile signal, cellular latency, or any other issues that may arise between you and any internet service provider, phone service provider or any other service provider. Furthermore, some of the features available on the Trading Platform may not be available on the BitMEX Mobile Application. Users may also be required to download and install updates to the BitMEX Mobile Application so as to maintain provision of the Services. Your failure to do so might lead to certain parts of the Services (including trading functions) becoming temporarily inaccessible to you until such update has been downloaded and installed.</p>
            <p><strong>7.8</strong>: You acknowledge, agree and understand that certain of the Services (including any software that may be produced, developed or published by the HDR Group from time to time) may be beta versions being tested at the time of release (a “Development Service”). Consequentially, such Development Services may be unstable and may change from time to time. The HDR Group does not warrant that the functionality of Development Services will meet your requirements or that the operation of Development Services will be uninterrupted or error-free. HDR reserves the right, at any time and for any reason, to discontinue, redesign, modify, enhance or change any Services (including the Development Services).</p>
            <p><strong>7.9</strong>: You acknowledge, agree and understand that:</p>
            <ul>
            <li>
            <p>a) BitMEX Testnet is provided for informational and testing purposes, and not for educational purposes;</p>
            </li>
            <li>
            <p>b) whilst BitMEX Testnet uses the same market data and indices as the Trading Platform, there may be discrepancies between the BitMEX Testnet and the Trading Platform; and</p>
            </li>
            <li>
            <p>c) any past performance and experience on and with BitMEX Testnet is not a reliable indicator of future returns, performance and experience with the Trading Platform.</p>
            </li>
            </ul>
            <h3 id="8-Indemnification"><a class="header-anchor" href="#8-Indemnification">8. Indemnification</a></h3>
            <p><strong>8.1</strong>: You agree to indemnify and hold harmless each member of the HDR Group and their respective directors, officers, employees, agents, contractors and licensors (together, the <strong>“Associated Parties”</strong>) immediately upon demand from and against any and all claims, demands, lawsuits, actions, proceedings, investigations, liabilities, damages, losses, costs or expenses, including reasonable attorneys’ fees, in any way arising out of, in relation to or in connection with, directly or indirectly, your or your authorised representatives’:</p>
            <ul>
            <li>
            <p>a) use of, or conduct in connection with, the Services;</p>
            </li>
            <li>
            <p>b)	breach of these Terms or any other policy of the HDR Group; or</p>
            </li>
            <li>
            <p>c)	violation of any Applicable Law or the rights of any other person or entity.</p>
            </li>
            </ul>
            <h3 id="9-Limitation-of-Liability"><a class="header-anchor" href="#9-Limitation-of-Liability">9. Limitation of Liability</a></h3>
            <p><strong>9.1</strong>: Nothing in these Terms shall exclude or restrict the HDR Group’s or any of the Associated Parties’ liability for:</p>
            <ul>
            <li>
            <p>a) fraud; or</p>
            </li>
            <li>
            <p>b) any other matter that cannot be excluded or limited under Applicable Law.</p>
            </li>
            </ul>
            <p><strong>9.2</strong>: Subject to the foregoing, to the maximum extent permitted by Applicable Law:</p>
            <ul>
            <li>
            <p>a) in no event shall the HDR Group or any of the Associated Parties be liable for any:</p>
            <ul>
            <li>i) indirect or consequential loss; or</li>
            <li>ii) loss of profit, business opportunity, revenue or goodwill, in each case, whether arising from breach of contract, tort (including negligence), breach of statutory duty or otherwise, arising out of or in connection with authorised or unauthorised use of the Services or these Terms, even if an authorised representative of the HDR Group or any of the Associated Parties has been advised of, knew of or should have known of the possibility of such damages; and</li>
            </ul>
            </li>
            <li>
            <p>b) the HDR Group’s and the Associated Parties’ aggregate liability in contract, tort or otherwise (including any liability for any negligent act or omission) howsoever arising out of or in connection with the performance of its obligations under these Terms in respect of any one or more incidents or occurrences shall be limited to the total net amount of Bitcoin received by HDR from you by way of trading fees in connection with your use of the Trading Platform in the six-month period immediately prior to the date of the incident, or the first incident of a series of connected incidents, giving rise to a claim made by you under these Terms.</p>
            </li>
            </ul>
            <h3 id="10-Calculations"><a class="header-anchor" href="#10-Calculations">10. Calculations</a></h3>
            <p><strong>10.1</strong>: All calculations performed by the Trading Platform’s trading engine and as verified by HDR are final. As noted in Clause 7, the HDR Group does not warrant that the use of the Trading Platform will be uninterrupted or error-free.</p>
            <h3 id="11-Termination-and-Remedies-for-Breach-of-these-Terms-by-You"><a class="header-anchor" href="#11-Termination-and-Remedies-for-Breach-of-these-Terms-by-You">11. Termination and Remedies for Breach of these Terms by You</a></h3>
            <p><strong>11.1</strong>: The HDR Group reserves the right to seek all remedies available at law and in equity for violations of these Terms, including without limitation, the right to restrict, suspend or terminate your account or deny you access to the Trading Platform without notice; and</p>
            <ul>
            <li>a) The HDR Group shall be entitled to disclose information (including, but not limited to, your user identity and personal details) when cooperating with law enforcement enquiries (whether or not such enquiries are mandatory under Applicable Law) or where permitted under or otherwise compliant with Applicable Law.</li>
            </ul>
            <h3 id="12-Confidentiality"><a class="header-anchor" href="#12-Confidentiality">12. Confidentiality</a></h3>
            <p><strong>12.1</strong>: You undertake not to disclose to any person or persons any Confidential Information that you may acquire in the course of your use of the Trading Platform.</p>
            <p><strong>12.2</strong>: For the purposes of these Terms, <strong>“Confidential Information”</strong> shall mean any written information (including information provided in electronic form) or oral information which is confidential or a trade secret or proprietary and which is clearly identified as confidential at the time of disclosure or would be assumed by a reasonable person to be confidential under the circumstances surrounding the disclosure. Notwithstanding the foregoing, Confidential Information shall not include information which is: (i) already known by you prior to receipt from us; (ii) publicly known or becomes publicly known through no wrongful act of you; (iii) rightfully received from a third party without you having knowledge of a breach of any other relevant confidentiality obligation; or (iv) independently developed by you. The obligations of this clause do not prevent you from disclosing Confidential Information either: (A) to a third party pursuant to a written authorisation from us; or (B) to satisfy a requirement of, or demand by, a competent court of law or other tribunal or governmental, or administrative or regulatory or self-regulatory body or listing authority or any Applicable Law, provided that HDR is notified prior to such disclosure to the extent permitted by Applicable Law.</p>
            <h3 id="13	Absence-of-Waiver"><a class="header-anchor" href="#13	Absence-of-Waiver">13.	Absence of Waiver</a></h3>
            <p><strong>13.1</strong>: Any failure or delay by the HDR Group to enforce any of the Terms or exercise any right under the Terms will not be construed as a waiver to any extent of our rights.</p>
            <h3 id="14-Force-Majeure"><a class="header-anchor" href="#14-Force-Majeure">14. Force Majeure</a></h3>
            <p><strong>14.1</strong>: Neither party is liable for delay in meeting its obligations due to any cause outside its reasonable control including acts of God, riot, war, malicious acts of damage, fires, electricity supply failures and government authority and edicts.</p>
            <h3 id="15-Survival"><a class="header-anchor" href="#15-Survival">15. Survival</a></h3>
            <p><strong>15.1</strong>: Should any provision of these Terms be held to be void, invalid, unenforceable or illegal by a court, the validity and enforceability of the other provisions shall not be affected. If any provision is determined to be unenforceable, you agree to an amendment by HDR of such provision to provide for enforcement of the provisions intent, to the extent permitted by applicable law.</p>
            <h3 id="16-Governing-Law"><a class="header-anchor" href="#16-Governing-Law">16. Governing Law</a></h3>
            <p>The Terms and any non-contractual obligations arising out of or in connection with them are governed by and construed in accordance with English law. The International Business Companies Act 1994 is the principal legislation that governs corporates in the Republic of Seychelles.</p>
            <h3 id="17-Dispute-Resolution"><a class="header-anchor" href="#17-Dispute-Resolution">17. Dispute Resolution</a></h3>
            <p>Subject to the Applicable Law of your jurisdiction, the courts of England have non-exclusive jurisdiction to settle any dispute arising from or connected with these Terms (including a dispute relating to the existence, validity or termination of these Terms or the consequences of their nullity or any non-contractual obligation arising out of or in connection with these Terms).</p>
            </div>
        </div>
        </div>
      );
    }
  }
