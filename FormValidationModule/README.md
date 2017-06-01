# FormValidationModule

 * Form module with validation logic. It includes some logic:
 1. attachToForm to attach input to Form
 2. validate to validate toched input onChange, includes
    additional methods to work with validation rules (convertValidationsToObject, runValidation, runValidationRule)
 3. submit to get form data if values is valid
 4. getCurrentValues to get all atached inputs value
 5. validateForm to validate all form inputs
 6. validateTouchedFields to validate fields whitch was touched and synchronize validation
 7. resetForm to reset form fields
 8. detachFromForm to remove inputs from Form
 9. preventEnterKey to prevent Enter Key submition
 10. submitOnDebounce to allow submition by timeout in sec

 example link: https://vladimirkolodyazhniy.github.io/FormValidationModule/index.html
