import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import axios from 'axios';
import './sidebar.css';

export default function SidebarFilters({ checkedValue, setCheckedValue }) {
  const filterOptionLabels = [
    { slug: 'end_year', title: 'Year' },
    { slug: 'topic', title: 'Topic' },
    { slug: 'sector', title: 'Sector' },
    { slug: 'region', title: 'Region' },
    { slug: 'pestle', title: 'PESTLE' },
    { slug: 'source', title: 'Source' },
    { slug: 'country', title: 'Country' },
  ];
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const filters = await axios.get(
          'http://localhost:3001/api/filterOptions'
        );
        setFilterOptions(filters.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckedValue([
        ...checkedValue,
        {
          key: e.target.name,
          value: e.target.value,
        },
      ]);
    } else {
      setCheckedValue(
        checkedValue.filter((val) => val.value !== e.target.value)
      );
    }
  };

  return (
    <ProSidebar>
      <Menu>
        <MenuItem>Filter</MenuItem>
        {filterOptionLabels.map((option, id) => (
          <SubMenu title={option.title} key={id}>
            {filterOptions &&
              filterOptions[option.slug] &&
              filterOptions[option.slug].map((item, id) => {
                if (id !== 0)
                  return (
                    <MenuItem key={id}>
                      <label htmlFor={item}>
                        <input
                          type="checkbox"
                          id={item}
                          name={option.slug}
                          value={item}
                          onChange={handleChange}
                        />
                        &nbsp;{item}
                      </label>
                    </MenuItem>
                  );
              })}
          </SubMenu>
        ))}
      </Menu>
    </ProSidebar>
  );
}
