import React from 'react'

import "./Header.css"

type HeaderProps = {
    name: string
}

function Header({name}: HeaderProps) {
  return (
    <header>{name}</header>
  )
}

export default Header