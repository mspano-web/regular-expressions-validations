/* index.js

    Example of using regular expressions to validate input data
*/

const fs = require('fs');
const path = require('path');

const regexCode = /^[A-Z]-\d{3}$/;

/*
    This regular expression validates the format of the "code" field. 
    The code should have the format "X-999", where "X" is a letter and "999" is a three-digit number.

    ^: Matches the start of the string.
    [A-Z]: Matches any uppercase alphabetical character.
    -: Matches the literal hyphen "-" between the letter and the three digits.
    \d{3}: Matches exactly three digits from 0 to 9.
    $: Matches the end of the string.
*/


const regexPurchaseDate  = /^(?:19|20)(?:(?:(?:[02468][048])|(?:[13579][26]))-02-29|(?:\d{2})-(?:(?:02-(?:0[1-9]|1\d|2[0-8]))|(?:((?:0[13-9]|1[012])-(?:0[1-9]|1\d|2\d|30)))|(?:((?:0[13578]|1[02])-31))))$/


/*
    ^: Indicates the start of the string, ensuring the match starts from the beginning.
    (?:19|20): This non-capturing group verifies that the first two digits of the year are either "19" or "20", setting the range of valid years.
    (: Initiates a broader non-capturing group.
        (?: Non-capturing group for the leap year validation and February 29.
            (?: Another non-capturing group for the leap year validation.
                (?:[02468][048]|[13579][26]): Matches leap years divisible by 4 but not by 100 unless also divisible by 400, such as 2000, 2004, 2008, etc.
                -02-29: Verifies February 29 for leap years.
        |: Indicates an alternative.
            \d{2}: Matches the last two digits representing the year, allowing for a specific year between 00 and 99.
            -: Separates the year from the month in the date.
            (?: Non-capturing group for non-leap years in February.
                (?:02-(?:0[1-9]|1\d|2[0-8])): Matches February (02) days from 01 to 28 in non-leap years.
            |: Indicates an alternative.
            (?: Non-capturing group for months with 30 days.
                (?: Non-capturing group for months with 30 days.
                    (?:0[13-9]|1[012]): Matches months with 30 days ().
                    (?:-(?:0[1-9]|1\d|2\d|30)): Matches days from 01 to 30 in months with 30 days.
            |: Indicates an alternative.
            (?: Non-capturing group for months with 31 days.
                (?: Non-capturing group for months with 31 days.
                    (?:0[13578]|1[02]): Matches months with 31 days: January, March, May, July, August, October, and December.
                    (?:-31): Matches the 31st day in months with 31 days.
     $: Matches the end of the string.

*/

//const regexPurchaseDate  = /^(?:(?:31\/(?:0?[13578]|1[02]))|(?:30\/(?:0?[13-9]|1[0-2]))|(?:0?[1-9]|1\d|2\d)\/(?:0?[1-9]|1[0-2]))\/\d{4}$/;

/*
    This regular expression validates the format of the "purchase date" field. 
    The date should have the format "DD/MM/YYYY", "D/MM/YYYY", or "DD/M/YYYY", 
        where "D" and "DD" represent one or two digits for the day, 
        "M" and "MM" represents one or two digits for the month, 
        and "YYYY" represents four digits for the year.
^
    /^ : parse the string from the beginning

    (?:31\/(?:0?[13578]|1[02])): This part matches the months that have 31 days 
        (January, March, May, July, August, October, and December).
        (?: non-capturing group 
            31\/: Matches the day "31" followed by a forward slash.
            (?:0?[13578]|1[02]): Matches the month part.
                (?: non-capturing group
                    0?[13578]: Matches months 01 to 09 or 10 to 12, where the leading zero is optional.
                    | : operator or 
                    1[02]: Matches months 10 or 12.

    | : operator or 

    (?:30\/(?:0?[13-9]|1[0-2]))  This part coincides with all months except February
        (?: non-capturing group 
            3o\/: Matches the day "30" followed by a forward slash.
            (?: non-capturing group 
                0?[13-9] : 0 optional + 1 to 9
                | : operator or 
                1[0-2]) : 10, 11 or 12

    | : operator or 

    (?:0?[1-9]|1\d|2\d)\/(?:0?[1-9]|1[0-2]))
        (?: non-capturing group 
            0?[1-9] : 0 optional + 1 to 9
            | : operator or 
            1\d : 1 + digit
            | : operator or 
            2\d : 2 + digit
            /
            ?: non-capturing group
            0?[1-9] : 0 optional + 1 to 9
            | : operator or
            1[0-2]) : 10.11 or 12

    / : character /
    
    \d{4}$/ : The year must have four digits, and must be at the end of the string

*/

const regexAmount = /(?:\d{1,4}(?:,\d{1,2})?)$/;
;

/*

This regular expression validates the format of the "amount" field. 
The amount should be in the format "9999,99", where "9999" represents the integer part and ",99" 
    represents the optional decimal part, with one or two digits.

        (?: non-capturing group 
        ^\d{1,4}: Matches one to four digits for the integer part.

        (?:,\d{1,2}?): Matches a comma followed by one or two digits for the decimal part, 
            with this part being optional (due to the ? at the end).
            (?: non-capturing group 
            d{1,2} : 1 or 2 digits
            ?: group optional

        $: Matches the end of the string.
*/
const regexDescription = /\S/;

/*
This regular expression validates that the "description" field is not empty, i.e., it contains at least one non-whitespace character.
/\S/:
    \S: Matches any character that is not a whitespace character.
 */

const regexEmail =  /\b(?:[A-Za-z0-9._%+-]+)@(?:[A-Za-z0-9.-]+)\.(?:[A-Za-z]{2,})\b/;


/*
    \b: This is a word boundary that ensures the email address is contained within a word boundary.
        The \b metacharacter in a regular expression is called a "word boundary." 
            It matches the position between a word character (alphanumeric or underscore) and 
            a non-word character (anything other than alphanumeric or underscore), or the start/end of the string.

    (?:[A-Za-z0-9._%+-]+): This is a non-capturing group that matches one or more alphanumeric characters, 
        dots, underscores, percentage signs, and the special characters + and - before the @ symbol.
        (?: non-capturing group 
        [A-Za-z0-9._%+-]: This character set matches any alphanumeric character (A-Z, a-z, 0-9), 
            as well as specific special characters (._%+-). Let's break it down further:
            A-Za-z: Matches any uppercase or lowercase letter.
            0-9: Matches any digit.
            ._%+-: Matches specific special characters:
            .: Matches a literal dot.
            _: Matches a literal underscore.
            %: Matches a literal percent sign.
            +: Matches a literal plus sign.
            -: Matches a literal hyphen.
        +: This quantifier matches one or more occurrences of the preceding character set. 
            It ensures that the pattern [A-Za-z0-9._%+-] is matched one or more times consecutively.

    @: This matches the literal @ symbol.
    
    (?:[A-Za-z0-9.-]+): This is a non-capturing group that matches one or more alphanumeric characters, dots, and hyphens before the . in the domain.
        (?: non-capturing group 
        [A-Za-z0-9.-]: Inside the non-capturing group, we have a character set that matches a single character. 
            Here's what each part represents:
            A-Za-z: Matches any uppercase or lowercase letter.
            0-9: Matches any digit.
            .-: Matches either a literal dot . or a hyphen -.
        +: This quantifier matches one or more occurrences of the preceding character set. 
            It ensures that the pattern [A-Za-z0-9.-] is matched one or more times consecutively.
    
    \.: This matches the literal . symbol.
    
    (?:[A-Za-z]{2,}): This is a non-capturing group that matches two or more alphabetical characters 
        after the last . in the domain to represent the top-level domain (TLD).
        (?: non-capturing group 
        [A-Za-z]: Inside the non-capturing group, we have a character set that matches a single alphabetical character. 
            Here, A-Za-z matches any uppercase or lowercase letter.
        {2,}: This quantifier matches two or more occurrences of the preceding character set. 
            It ensures that the pattern [A-Za-z] is matched at least twice consecutively.
             in this context, we ensure that the TLD portion of the email address has at least two letters, 
                which is a common requirement for valid email addresses.

    \b: This is another word boundary that ensures the email address is contained within a word boundary.
*/

const pathFileCSV = path.join(__dirname, 'expresiones regulares.csv');

fs.readFile(pathFileCSV, 'utf8', (error, data) => {
    if (error) {
        console.error('Error reading file: ', error);
        return;
    }

    const lines = data.split('\n');

    for (let i = 1; i < lines.length - 1; i++) { 
        const register = lines[i].trim().split(';');
        console.log("------------------------------------------------")
        console.log(`Processing line: ${i}, data: ${register}`)
        console.log(`Code: ${register[0]}, Description: ${register[1]} ,Purchase Date: ${register[2]}, Amount: ${register[4]} Email: ${register[5]}`)

        const validCode = regexCode.test(register[0]);
        const validDescription = regexDescription.test(register[1]);
        const validPurchaseDate = regexPurchaseDate.test(register[2]);
        const validAmount = regexAmount.test(register[4]);
        const validEmail = regexEmail.test(register[5]);
        

        if (!validCode) {
            console.log(`Invalid Registration - Code: ${register[0]}`);
        } else if (!validPurchaseDate) {
            console.log(`Invalid Registration - Purchase Date: ${register[2]}`);
        } else if (!validAmount) {
            console.log(`Invalid Registration - Amount: ${register[4]}`);
        } else if (!validDescription) {
            console.log(`Invalid Registration - Description: ${register[1]}`);
        } else if (!validEmail) {
            console.log(`Invalid Registration - Email: ${register[5]}`);
        } else {
            console.log("Register OK");
        }
    }
 });
