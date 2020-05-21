import React from 'react'
import {NavLink} from 'react-router-dom'

export default function ({path, title}) {

return  <NavLink href={path}>{title}</NavLink>
}
