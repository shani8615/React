import React, { Component } from 'react';
   const customStorageCapacityRanges = [
      '0',
      '250GB',
      '500GB',
      '1TB',
      '2TB',
      '3TB',
      '4TB',
      '8TB',
      '12TB',
      '24TB',
      '48TB',
      '72TB',
    ];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageCapacity: '0', // Default frequency value
      selectedHdtype: 'All', // Default filter option
      isCheckboxChecked: false, // Checkbox initial state
      selectedStorageOptions: [], // Array to store selected storage options
      selectedLocation: 'All', // Default location filter
    };
  }

  handleStorageCapacityChange = (value) => {
    this.setState({ storageCapacity: value });
    // You can add code here to filter the user list based on the selected storage capacity.
  }

  handleFilterChange = (e) => {
    this.setState({ selectedOption: e.target.value });
    // You can add code here to filter the user list based on the selected filter option.
  }

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      isCheckboxChecked: !prevState.isCheckboxChecked,
    }));
    // You can add code here to handle the checkbox state and filter accordingly.
  }

  handleStorageOptionChange = (option) => {
    // Toggle the selected storage option in the state array
    this.setState((prevState) => {
      const selectedStorageOptions = [...prevState.selectedStorageOptions];

      if (selectedStorageOptions.includes(option)) {
        selectedStorageOptions.splice(
          selectedStorageOptions.indexOf(option),
          1
        );
      } else {
        selectedStorageOptions.push(option);
      }

      return { selectedStorageOptions };
    });
    // You can add code here to filter the user list based on selected storage options.
  }

  handleLocationChange = (e) => {
    this.setState({ selectedLocation: e.target.value });
    // You can add code here to filter the user list based on the selected location.
  }

   handleHdtypeChange = (e) => {
    this.setState({ selectedHdtype: e.target.value });
    // You can add code here to filter the user list based on the selected location.
  }

  handleSearch = () => {
    // Collect all filter data from the state
    const selectedIndex = customStorageCapacityRanges.indexOf(this.state.storageCapacity);

  // Create a new array with all the range values up to the selected one
  const selectedStorageOptions = customStorageCapacityRanges.slice(0, selectedIndex + 1);

    const filterData = {
      storageCapacity: selectedStorageOptions,
      selectedHdtype: this.state.selectedHdtype,
      isCheckboxChecked: this.state.isCheckboxChecked,
      selectedStorageOptions: this.state.selectedStorageOptions,
      selectedLocation: this.state.selectedLocation,
    };

    console.log("data",filterData);
    // Replace the URL with your API endpoint
    const apiUrl = 'http://localhost:8000/api/filter-users'; // Update with your API URL

    // Send a POST request with the filter data to the API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data here
        console.log('API Response:', data);
        this.props.updateUserState(data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }

    handleReset = () => {
    // Reset all filter values to their initial state
    this.setState({
      storageCapacity: '0',
      selectedHdtype: 'All',
      isCheckboxChecked: false,
      selectedStorageOptions: [],
      selectedLocation: 'All',
    });

    const filterData = {
    storageCapacity: '0',
    selectedHdtype: 'All',
    isCheckboxChecked: false,
    selectedStorageOptions: [],
    selectedLocation: 'All',
  };

    console.log("data",filterData);
    // Replace the URL with your API endpoint
    const apiUrl = 'http://localhost:8000/api/filter-users'; // Update with your API URL

    // Send a POST request with the filter data to the API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data here
        console.log('API Response:', data);
        this.props.updateUserState(data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  render() {
    const storageOptions = ["2GB", "4GB", "8GB", "12GB", "16GB", "24GB", "32GB", "48GB", "64GB", "96GB"];
    const locationOptions = [
      'All',
      'AmsterdamAMS-01',
      'Washington D.C.WDC-01',
      'San FranciscoSFO-12',
      'SingaporeSIN-11',
      'DallasDAL-10',
      'FrankfurtFRA-10',
      'Hong KongHKG-10',
    ];

     const HdtypeOptions = [
    'All','SAS', 'SATA', 'SSD'
    ];
    // Custom storage capacity range options
 
    const rangeValueIndex = customStorageCapacityRanges.indexOf(this.state.storageCapacity);

    return (
      <div className="search-container">
        <div className="filters-drawer">
          <div className="filter-group">
            <h3 className="filter-heading">Storage</h3>
           <input
      type="range"
      min="0"
      max={customStorageCapacityRanges.length - 1}
      step="1"
      value={rangeValueIndex}
      onChange={(e) =>
        this.handleStorageCapacityChange(customStorageCapacityRanges[e.target.value])
      }
      className="range-slider"
    />
    <div className="range-value-marker">
       {customStorageCapacityRanges
                .slice(0, rangeValueIndex + 1) // Get values up to the selected index
                .join(' - ')}
    </div>

          </div>
          <div className="filter-group">
            <h3 className="filter-heading">Ram</h3>
            <div className="checkbox-options">
              {storageOptions.map((option) => (
                <label className="checkbox-label" key={option}>
                  <input
                    type="checkbox"
                    checked={this.state.selectedStorageOptions.includes(option)}
                    onChange={() => this.handleStorageOptionChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h3 className="filter-heading">Location</h3>
            <select
              className="select-box"
              value={this.state.selectedLocation}
              onChange={this.handleLocationChange}
            >
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

           <div className="filter-group">
            <h3 className="filter-heading">Hard Disk Type</h3>
            <select
              className="select-box"
              value={this.state.selectedHdtype}
              onChange={this.handleHdtypeChange}
            >
              {HdtypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        
        <div className="filter-group">
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
        <button className="search-button" onClick={this.handleReset}>
          Reset
        </button>
        </div>
        </div>
      </div>
    );
  }
}

export default Search;
