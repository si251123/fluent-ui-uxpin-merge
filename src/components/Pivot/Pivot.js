import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Pivot as FPivot,
  PivotItem
} from '@fluentui/react/lib/Pivot';
import { getTokens, csv2arr } from '../_helpers/parser';



//Default pivot tab items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultTabs = `Tab One
Tab Two
Tab Three
Tab Four`;



class Pivot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabs !== this.props.tabs
      || prevProps.selectedIndex !== this.props.selectedIndex) {

      this.set();
    }
  }

  //Parse the choice items
  set() {
    let items = csv2arr(this.props.tabs)
      .flat()
      .map((val, index) => ({
        text: getTokens(val).text,
        key: index + 1,
        icon: this.getLeftIcon(val)
      }));

    this.setState({
      tabs: items,
      selectedIndex: this.props.selectedIndex
    });
  }

  //Get the user-entered left icon name, if there is one
  getLeftIcon(str) {
    const tokens = getTokens(str).tokens
    const leftIcon = tokens && tokens.find(t => t.type === 'icon' && t.position.placement === 'start')
    return leftIcon ? leftIcon.target : null
  }

  _onLinkClick(selectedItem) {

    //The index comes in 1-based. 1 is also our value floor.
    var selectedIndex = 1;

    if (selectedItem.props.itemKey > 1)
      selectedIndex = selectedItem.props.itemKey;

    this.setState(
      { selectedIndex: selectedIndex }
    )

    //If the prop for an individual tab's click event exists, let's push it. 
    //Raise this event to UXPin. We'll send them info about which item was clicked on in case they can catch it.
    if (this.props[`onLink${selectedIndex}Click`]) {
      this.props[`onLink${selectedIndex}Click`](selectedIndex);
    }
  }


  render() {

    //Set up the tabs
    //Microsoft makes us instantiate tabs individually. For some reason, we can't set the tabs through props.
    let tabs = this.state.tabs;
    var i;
    var tabList = [];

    for (i = 0; i < tabs.length; i++) {
      let t = tabs[i];
      //The key is already 1 based
      let tab = (
        <PivotItem
          headerText={t.text}
          itemKey={t.key}
          key={t.key}
          itemIcon={t.icon}
        />
      );
      tabList.push(tab);
    }

    //The prop is 1-based. The tab keys are also 1-based.
    let key = this.state.selectedIndex;

    return (

      <FPivot
        {...this.props}
        selectedKey={key}
        onLinkClick={(pi) => { this._onLinkClick(pi); }} >
        {tabList}
      </FPivot>
    )
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Pivot.propTypes = {

  /**
  * @uxpindescription The 1-based index value of the tab to be shown as selected by default
  * @uxpinpropname Selected Index
  */
  selectedIndex: PropTypes.number,

  /**
  * @uxpindescription The list of tabs. Put one item on each row. Enclose an item in quotes if including a comma. Supports the icon(IconName) feature.
  * @uxpinpropname Tabs
  * @uxpincontroltype codeeditor
  */
  tabs: PropTypes.string.isRequired,

  /**
  * @uxpindescription Fires when Tab 1 is clicked
  * @uxpinpropname Tab 1 Click
  */
  onLink1Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 2 is clicked
  * @uxpinpropname Tab 2 Click
  */
  onLink2Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 3 is clicked
  * @uxpinpropname Tab 3 Click
  */
  onLink3Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 4 is clicked
  * @uxpinpropname Tab 4 Click
  */
  onLink4Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 5 is clicked
  * @uxpinpropname Tab 5 Click
  */
  onLink5Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 6 is clicked
  * @uxpinpropname Tab 6 Click
  */
  onLink6Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 7 is clicked
  * @uxpinpropname Tab 7 Click
  */
  onLink7Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 8 is clicked
  * @uxpinpropname Tab 8 Click
  */
  onLink8Click: PropTypes.func,

  /**
  * @uxpindescription Fires when Tab 9 is clicked
  * @uxpinpropname Tab 9 Click
  */
  onLink9Click: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Pivot.defaultProps = {
  tabs: defaultTabs,
  selectedIndex: 1
};

export { Pivot as default };
