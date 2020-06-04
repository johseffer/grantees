import React from 'react'
import { navigate } from 'hookrouter'
import GranteeForm from '../components/grantee-form/grantee-form.component'

import './grantee-add.page.scss'

const GranteeAddPage = (props) => {

    const onClickCancel = () => {
        navigate('/');
    }

    return (
        <div className="add-grantee-container">
            <GranteeForm onClickCancel={onClickCancel} />
        </div>
    )
}

export default GranteeAddPage