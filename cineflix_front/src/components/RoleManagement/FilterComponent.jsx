import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React from 'react'
import "./css/FilterComponent.css";
import { Button } from 'flowbite-react';


function FilterComponent() {
    return (
        <>
            <div className="filterContainer space-y-4 ml-6">
                <div className="mt-10 mr-6">
                    <TextField id="outlined-search" label="Search name" type="search" />
                    </div>
                <div className="mt-4 mr-6">
                <TextField id="outlined-search" label="Search email" type="search" />
                </div>
                <div className="p-4">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Admin" />
                        <FormControlLabel control={<Checkbox />} label="User" />
                    </FormGroup>
                </div>
            </div>
        </>
    )
}

export default FilterComponent