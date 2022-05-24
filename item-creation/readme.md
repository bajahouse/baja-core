This module requires you to go into your modules/default/datasets/dataset/dataset.conf file and remove these 2:

!item-dbc-disabler'(to allow for fully custom item icons. can be skipped if only modifying existing items) 

'!client-extensions'(for hover cache update, possibly eventually changed out for addon messages)

 from the Client.Patches section. Then run 'start client'
