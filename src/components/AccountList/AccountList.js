import { memo } from 'react'
import PropTypes from 'prop-types'
import AccountItem from './AccountItem'

function AccountList({ searchResult }) {
    return searchResult.map((result) => <AccountItem key={result.id} data={result} />)
}

AccountList.propTypes = {
    searchResult: PropTypes.array.isRequired,
}

export default memo(AccountList)
