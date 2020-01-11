import React from 'react';

import MainNavbar from '../components/MainNavBar';
import { 
  Button, 
  Card, 
  Cell,
  Column,
  ColumnHeaderCell,
  CopyCellsMenuItem,
  IMenuContext,
  SelectionModes,
  Table,
  Utils,
} from "@blueprintjs/core";

export default class LeaderboardPage extends React.Component {
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
              <Card>
              <table cellspacing="0">
                <thead>
                  <tr class="visual-header">
                  <th class="rank">
                    <div class="th-inner">
                      <span>Rank</span>
                    </div>
                  </th>
                  <th class="name">
                  <div class="th-inner">
                  <span>Name</span>
                  </div>
                  </th>
                  <th class="profit">
                  <div class="th-inner">
                  <span>Profit</span>
                  </div>
                  </th>
                  <th class="isRealName">
                  <div class="th-inner">
                  <span>Is Real Name</span>
                  </div>
                  </th>
                  </tr>
                </thead><tbody><tr class="">
                  <td class="rank">1</td>
                  <td class="name">Heavy-Autumn-Wolf</td>
                  <td class="profit">7,545.7213 XBT</td>
                  <td class="isRealName">
                  <i class="fa fa-fw fa-remove">
                  </i></td></tr><tr class=""><td class="rank">2</td><td class="name">Mercury-Wood-Sprite</td><td class="profit">7,182.8567 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">3</td><td class="name">Quick-Grove-Mind</td><td class="profit">7,172.5555 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">4</td><td class="name">Alameda Research</td><td class="profit">5,244.6841 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">5</td><td class="name">Hot-Relic-Fancier</td><td class="profit">4,216.2958 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">6</td><td class="name">Skitter-Peridot-Raven</td><td class="profit">2,450.1973 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">7</td><td class="name">Paper-Feather-Stallion</td><td class="profit">1,961.4545 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">8</td><td class="name">coincidentcapitalltd</td><td class="profit">1,956.1107 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">9</td><td class="name">Jade-Platinum-Legs</td><td class="profit">1,954.1041 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">10</td><td class="name">Roger_Leotank</td><td class="profit">1,764.5478 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">11</td><td class="name">Honeysuckle-South-Rib</td><td class="profit">1,748.7634 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">12</td><td class="name">AK is fraud</td><td class="profit">1,729.5314 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">13</td><td class="name">alamedaresearchltd@gmail.com</td><td class="profit">1,696.7039 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">14</td><td class="name">Tree-Surf-Dragon</td><td class="profit">1,634.6763 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">15</td><td class="name">Circle_Trade</td><td class="profit">1,619.6382 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">16</td><td class="name">Cream-White-Ox</td><td class="profit">1,527.8165 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">17</td><td class="name">daniel3</td><td class="profit">1,514.6067 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">18</td><td class="name">Jelly-Mint-Flier</td><td class="profit">1,484.0432 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">19</td><td class="name">xorq</td><td class="profit">1,417.1986 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">20</td><td class="name">Cedar-Spice-Fisher</td><td class="profit">1,406.4004 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">21</td><td class="name">Quill-Rift-Hoof</td><td class="profit">1,353.5241 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">22</td><td class="name">Linen</td><td class="profit">1,259.0473 XBT</td><td class="isRealName"><i class="fa fa-fw fa-check"></i></td></tr><tr class=""><td class="rank">23</td><td class="name">Denim-Sun-Speaker</td><td class="profit">1,218.5577 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">24</td><td class="name">Big-Rift-Sting</td><td class="profit">1,194.8446 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr><tr class=""><td class="rank">25</td><td class="name">Leather-Metal-Razor</td><td class="profit">1,188.3187 XBT</td><td class="isRealName"><i class="fa fa-fw fa-remove"></i></td></tr></tbody></table>
              </Card>
            </div>
          </div>
      );
    }
  }
  