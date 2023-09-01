/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import info from './info'
import contractinformation from './contractinformation'
import applications from './applications'
import document from './document'
import rekvizits from './rekvizits'
import managment from './managment'
import report from './report'
// import guide from './guide'
// Array of sections
export default [...info, ...contractinformation, ...applications, ...document, ...rekvizits, ...managment, ...report,]
