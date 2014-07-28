#angularjs-autosave
==================

angularjs-autosave is a simple directive which gives power to your project so it can save data from any html form to database automatically.
You can choose either this function will trigger in some fixed interval or whenever focus of any html element changes.

## why?

* *Easy to integrate* - It is very easy to integrate into your running project. 
* *More options* - You will get more option for autosave viz. interval and blur.

## Requirements

You need to get this working are - 

1. AngularJS
2. The directive code

## Restrictions

1. You can not use angularjs-autosave directive other than form(<form>)
2. You have to use it as a attribute of form tag.

## Using it

There are two parts to using the angularjs-autosave Directive, the HTML and the JS Controller code.

You can use angularjs-autosave directory  in two mode

1. interval mode and
2. blur mode


Let us take a look at the HTML first:

*If you are using interval mode

```
 <form name="someForm" class="form-group"
              ng-submit="frmCtrl.submitForm()"
              auto-save
              auto-save-model="frmCtrl.modelObj"
              auto-save-fn="frmCtrl.partialSave"
              auto-save-mode="interval"
              auto-save-interval="5000">
```
There are five major attributes in the form element.

1. *auto-save*: This marks the DOM element as a autosave component. Without it, the rest are useless
2. *auto-save-model*: This defines the model object, should be defined within your controller.
					  modelObj is the model(data) which is going to save and restore over the process.
3. *auto-save-fn*:  This attributes set the function which is responsible for database call. This should be defined
				    within your controller. In other language, this function will execute after after a certain interval
				    which you will set later.
4. *auto-save-mode*:  This will set the behavior of directive. In this case *auto-save-fn* will execute after an interval.				  
5. *auto-save-interval*: After how much time auto-save-fn will execute should be decided here. Remember this attribute takes 
                         time in millisecond, so in above example auto-save-fn will execute in every 5 seconds.


*If you are using blur mode(whenever htlm element got focus or changes foucus within a form)

```
 <form name="someForm" class="form-group"
              ng-submit="frmCtrl.submitForm()"
              auto-save
              auto-save-model="frmCtrl.modelObj"
              auto-save-fn="frmCtrl.partialSave"
              auto-save-mode="blur">
```
Here two things have changed.

1. *auto-save-mode*: Here the value of auto-save-mode is "blur", this means whenever focus chenges in html form
					 from one element to another. auto-save-fn will execute.
2. *auto-save-interval* attribute is removed because we don't need that here since we are not using interval mode.					 	