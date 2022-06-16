export const progLanguages = [
  { name: 'C++', version: '17' },
  { name: 'C++', version: '20' },
  { name: 'Dart', version: '2.1' },
  { name: 'Elixir', version: '1.1' },
  { name: 'Elm', version: '0.19' },
  { name: 'Erlang', version: '1' },
  { name: 'Go', version: '17' },
  { name: 'Go', version: '18' },
  { name: 'Haskell', version: '13' },
  { name: 'Java', version: '8' },
  { name: 'Java', version: '17' },
  { name: 'JavaScript', version: 'ES5' },
  { name: 'JavaScript', version: 'ES6' },
  { name: 'Kotlin', version: '1.6' },
  { name: 'Lua', version: '3.1' },
  { name: 'PHP', version: '7.0' },
  { name: 'PHP', version: '8.0' },
  { name: 'Python', version: '2' },
  { name: 'Python', version: '3' },
  { name: 'Ruby', version: '2.7' },
  { name: 'Ruby', version: '3.1' },
  { name: 'Rust', version: '1.57' },
  { name: 'Scala', version: '2.1' },
  { name: 'Swift', version: '2.0' },
  { name: 'TypeScript', version: '4.6' },
];

export const tagNames = [
  'ai',
  'android',
  'angular',
  'artificial-intelligence',
  'bootstrap',
  'challenge',
  'components',
  'css-framework',
  'css',
  'cython',
  'dart',
  'data-science',
  'deep-learning',
  'design-systems',
  'documentation',
  'ember',
  'entity-linking',
  'flutter-apps',
  'flutter',
  'html',
  'html',
  'ios',
  'javascript',
  'machine-learning',
  'material-design',
  'material',
  'named-entity-recognition',
  'natural-language-processing',
  'neural-network',
  'neural-networks',
  'neuromorphic',
  'nlp-library',
  'nlp',
  'package',
  'python',
  'react-native',
  'react',
  'sass',
  'scss',
  'smart',
  'spacy',
  'storybook',
  'styleguide',
  'svelte-components',
  'svelte',
  'sveltejs',
  'testing',
  'text-classification',
  'timeline',
  'tokenization',
  'typescript',
  'ui-components',
  'ui',
  'vue',
  'web-components',
  'webpack',
  'widget',
];

export const snippetContent = [
  {
    headline: 'sort-object-to_str.js',
    content: `var random_string = require('./random-string');

function wide_object() {
    var o = {};

    for (var i = 0; i < 10; ++i) {
        o[random_string()] = random_string();
    }

    return o;
}


if (require.main === module) {
    console.log(JSON.stringify(wide_object(), null, 4));
}
module.exports = wide_object;`,
  },

  {
    headline: 'random-string.js',
    content: `// returns the object with keys sorted alphabetically (ignoring case) as a string
function sort_object_to_str(o) {
    var object_string = '';
    var keys = Object.keys(o).sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    object_string += '{';
    for (var i = 0; i < keys.length - 1; ++i) {
        object_string += '"' + keys[i] + '":' + JSON.stringify(o[keys[i]]) + ',';
    }
    object_string += '"' + keys[keys.length - 1] + '":' + JSON.stringify(o[keys[keys.length - 1]]) + '}';

    return object_string;
}


function sort_json_file_to_str(path) {
    var fs = require('fs');
    return sort_object_to_str(JSON.parse(fs.readFileSync('unsorted.json')));
}


function _test(o) {
    var _ = require('underscore');
    var base = {
        "a": {
            "aa": "aa",
            "ab": "ab"
        },
        "c": {
            "cc": "cc"
        },
        "b": "b"
    };
    o = o || base;


    if (_.isEqual(o, JSON.parse(sort_object_to_str(o)))) {
        console.log('TEST PASSED');
    }
    else {
        console.log('TEST FAILED');
    }
}

// Paste your object in here
var base = {};

if (require.main === module) {
    console.log(sort_object_to_str(base));
    // console.log(sort_json_file_to_str('unsorted.json'));

    // _test();
}
module.exports = sort_object_to_str;`,
  },
  {
    headline: 'random-object.js',
    content: `var exec = require('child_process').execSync;
var output = '[' + exec('git log --pretty=format:'{"commit":"%H","author":"%an","email":"%ae","date":"%ad","message":"%f"},'').toString().slice(0, - 1) + ']';
var json = JSON.parse(output);
console.log(JSON.stringify(json, null, 4))`,
  },
  {
    headline: 'git-to_json.js',
    content: `var random_string = require('./random-string');

function wide_object() {
    var o = {};

    for (var i = 0; i < 10; ++i) {
        o[random_string()] = random_string();
    }

    return o;
}


if (require.main === module) {
    console.log(JSON.stringify(wide_object(), null, 4));
}
module.exports = wide_object;`,
  },

  {
    headline: 'Arrow Function Short Hand',
    content: `var simpleFunc =(int a,int b) => a+b;
void main() {
 print(simpleFunc(2,3));
}`,
  },
  {
    headline: 'Omit',
    content: `interface MyInterface {
    id: number;
    name: string;
    properties: string[];
  }

type MyShortType = Omit<MyInterface, 'name' | 'id'>;`,
  },
  {
    headline: 'Record',
    content: `const myTypedObject: {[key: string]: MyInterface} = {
  first: {...},
  second: {...},
  ...
}`,
  },
  {
    headline: 'Optional Chaining',
    content: `<React.Fragment>
  {apiResult?.data?.params?.showOnline && (<div>✅ Online</div>)}
</React.Fragment>`,
  },
  {
    headline: 'UTF-8 conversion',
    content: `  def iconvert(str, encoding_from, encoding_to = "utf8")
    i = Iconv.new encoding_to, encoding_from
    utf_str = ""
    begin
      utf_str << i.iconv(str)
    rescue Exception => e
      utf_str << e.success
      ch, str = e.failed.split(//, 2)
      utf_str << "?"
    end
    return utf_str
  end`,
  },
  {
    headline: 'Converting Array to Map',
    content: `import java.util.Map;
import org.apache.commons.lang.ArrayUtils;
public class Main {
  public static void main(String[] args) {
    String[][] countries = { { "United States", "New York" }, { "United Kingdom", "London" },
        { "Netherland", "Amsterdam" }, { "Japan", "Tokyo" }, { "France", "Paris" } };
    Map countryCapitals = ArrayUtils.toMap(countries);
System.out.println("Capital of Japan is " + countryCapitals.get("Japan"));System.out.println("Capital of France is " + countryCapitals.get("France")); } }
`,
  },
  {
    headline: 'Select database table and populate',
    content: `$result = $mysqli->query('SELECT * FROM students');
while ($row = $result->fetch_assoc()) {
	echo $row['name'] . '<br>';
}`,
  },
  {
    headline: 'Dropdown Menu',
    content: `import 'package:flutter/material.dart';
void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyDropDown()
    );
  }
}

class MyDropDown extends StatefulWidget {
  @override
  _MyDropDownState createState() => _MyDropDownState();
}

class _MyDropDownState extends State<MyDropDown> {
  final List<String> subjects = ["Computer Science", "Biology", "Math"];

  String selectedSubject = "Biology";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        padding: EdgeInsets.all(32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            DropdownButton<String>(
              value: selectedSubject,
              onChanged: (value){
                setState(() {
                  selectedSubject = value;
                });
              },
              items: subjects.map<DropdownMenuItem<String>>((value){
                return DropdownMenuItem(
                  child: Text(value),
                  value: value,
                );
              }).toList(),
            ),

            Text(selectedSubject, style: TextStyle(fontSize: 36, fontWeight: FontWeight.w900),)

          ],
        ),
      ),
    );
  }
}`,
  },
  {
    headline: 'Stateless Widget',
    content: `class name extends StatefulWidget {
  name({Key? key}) : super(key: key);

  @override
  State<name> createState() => _nameState();
}

class _nameState extends State<name> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}`,
  },
  {
    headline: 'Converting class objects to JSON string',
    content: `class Employee {
  final String name;
  final String email;

  Employee(this.name, this.email);

  Employee.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        email = json['email'];

  Map<String, dynamic> toJson() =>
    {
      'name': name,
      'email': email,
    };
}

//Now CONVERT SIMPLE JSON TO FLUTTER OBJECT
Map employeeMap = jsonDecode(jsonString);
var employee = Employee.fromJson(employeeMap);

//CONVERT FLUTTER OBJECT TO SIMPLE JSON STRING
String json = jsonEncode(employee);`,
  },
  {
    headline: 'Bloc',
    content: `class SubjectBloc extends Bloc<SubjectEvent, SubjectState> {
  SubjectBloc() : super(SubjectInitial()) {
    on<SubjectEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}`,
  },
  {
    headline: 'Stateful Widget with Animation',
    content: `class  extends StatefulWidget {
  const ({ Key? key }) : super(key: key);

  @override
  State<> createState() => _State();
}

class _State extends State<>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(

    );
  }
}`,
  },
  {
    headline: 'Change Text Style',
    content: `Text(
    'Here will be the text',
    style: TextStyle(
        color: Colors.blue,
        fontWeight: FontWeight.bold,
        fontSize: 30.0,
        fontStyle: FontStyle.italic,
        fontFamily: 'cursive'
    ),
),`,
  },
  {
    headline: 'StreamBuilder',
    content: `StreamBuilder(
  stream: stream,
  initialData: initialData,
  builder: (BuildContext context, AsyncSnapshot snapshot) {
    return Container(
      child: child,
    );
  },
),`,
  },
  {
    headline: 'ValueListenableBuilder',
    content: `ValueListenableBuilder(
  valueListenable:  null,
  builder: (BuildContext context, dynamic value, Widget? child) {
    return  Container();
  },
),`,
  },
  {
    headline: 'MultiRepositoryProvider',
    content: `MultiRepositoryProvider(
  providers: [
    RepositoryProvider(
      create: (context) => SubjectRepository(),
    ),
    RepositoryProvider(
      create: (context) => SubjectRepository(),
    ),
  ],
  child: Container(),
)`,
  },

  {
    headline: 'Styled Card Widget',
    content: `Widget getUICard() {
  return SizedBox(
      height: 300.00,
      child: Card(
        elevation: 8.0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                "New York",
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."),
            ),
          ],
        ),
      ));
}`,
  },
  {
    headline: 'Parsing & processing parameters',
    content: `while [ "$1" != "" ]; do
    case $1 in
        -s  )   shift
		SERVER=$1 ;;
        -d  )   shift
		DATE=$1 ;;
	--paramter|p ) shift
		PARAMETER=$1;;
        -h|help  )   usage # function call
                exit ;;
        * )     usage # All other parameters
                exit 1
    esac
    shift
done`,
  },
  {
    headline: 'Checking if process is running',
    content: `# Define shell function
check_process() {
	echo "Checking if process $1 exists..."
	[ "$1" = "" ]  && return 0
	PROCESS_NUM=$(ps -ef | grep "$1" | grep -v "grep" | wc -l)
	if [ $PROCESS_NUM -ge 1 ];
	then
	        return 1
	else
	        return 0
	fi
}`,
  },
  {
    headline: 'Send Email Function',
    content: `# sendEmail Function - mail & exit.
START=$(date +%s)
sendEmail() {
	scripttime=0;
	END=$(date +%s)
	DIFF=$(( $END - $START ))
	if [ $DIFF -le 60 ]; then
		scripttime="$DIFF seconds.";
	else
		DIFF=$(( $DIFF / 60 ))
		scripttime="$DIFF minutes.";
	fi;
	content="$content. Exec Time: $scripttime"
	echo $content | mail -s "$subject" $email_list
	exit;
}
# sendEmail Function - end.`,
  },
  {
    headline: 'Convert num to ordinal',
    content: `fn num_to_ordinal_expr(x: u32) -> String {
    format!("{}{}", x, match (x % 10, x % 100) {
        (_, 4...20) => "th",
        (1, _) => "st",
        (2, _) => "nd",
        (3, _) => "rd",
        _ => "th",
    })
}`,
  },
  {
    headline: 'Floating Section Heading',
    content: `.container {
  display: grid;
  place-items: center;
  min-height: 400px;
}

.floating-stack {
  background: #455A64;
  color: #fff;
  height: 80vh;
  width: 320px;
  border-radius: 1rem;
  overflow-y: auto;
}

.floating-stack > dl {
  margin: 0 0 1rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: center;
}
`,
  },
  {
    headline: 'Menu on image hover',
    content: `.hover-menu {
  position: relative;
  overflow: hidden;
  margin: 8px;
  min-width: 340px;
  max-width: 480px;
  max-height: 290px;
  width: 100%;
  background: #000;
  text-align: center;
  box-sizing: border-box;
}

.hover-menu * {
  box-sizing: border-box;
}

.hover-menu img {
  position: relative;
  max-width: 100%;
  top: 0;
  right: 0;
  opacity: 1;
  transition: 0.3s ease-in-out;
}`,
  },
  {
    headline: 'Staggered Animation',
    content: `.stagger-menu {
  list-style-type: none;
  margin: 16px 0;
  padding: 0;
}

.stagger-menu li {
  margin-bottom: 8px;
  font-size: 18px;
  opacity: 0;
  transform: translateX(100%);
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.750, -0.015, 0.565, 1.055);
}

.menu-toggler:checked ~ .stagger-menu li {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(0.055s * var(--i));
}`,
  },
  {
    headline: 'Vertical scroll snap',
    content: `.vertical-snap {
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  width: calc(180px + 1rem);
  padding: 1rem;
  height: 480px;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
}

.vertical-snap > a {
  scroll-snap-align: center;
}

.vertical-snap img {
  width: 180px;
  object-fit: contain;
  border-radius: 1rem;
}`,
  },
];
