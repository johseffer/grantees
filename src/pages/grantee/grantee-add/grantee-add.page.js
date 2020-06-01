import React from 'react'
import GranteeForm from '../components/grantee-form/grantee-form.component'

import './grantee-add.page.scss'

const GranteeAddPage = (props) => {
    return (
        <div className="add-grantee-container">
            <GranteeForm />
        </div>
    )
}

export default GranteeAddPage