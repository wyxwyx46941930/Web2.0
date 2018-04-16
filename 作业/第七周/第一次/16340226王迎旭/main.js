//修改了以下的问题
//v1
//①处理了重名仍可以加载的bug
//②处理了页面时间出来时抖动的问题
//v2
//①处理了页面多次点击注册崩溃的bug
//②处理了页面输入长度不够的bug


//变量声明阶段以及http构建部分--------------------------------------------------------------------------------------------
var Http = require('http'),
    Url = require('url'),
    Path = require('path'),
    QueryString = require('querystring'),
    FileSystem = require('fs'),
    CheckError = require('./node_modules/checkerror.js');
var DataSource = function() 
{
    var dataSource, prepared = false;
    function _DataSource() 
    {
        this.prepare = function() 
        {
            if (!prepared) 
            {
                dataSource = {};
                dataSource.students = [];
                prepared = true;
            }
        };
        this.addStudent = function(student) 
        {
            dataSource.students.push(student);
        };
        this.findStudentBy = function(key, value) 
        {
            if (!value) 
            {
                return null;
            }
            for (var i = 0; i < dataSource.students.length; ++i) 
            {
                if ((dataSource.students[i])[key] == value) 
                {
                    return dataSource.students[i];
                }
            }
            return null;
        };
    }
    return new _DataSource();
}();
function ServerMain() 
{
    DataSource.prepare();
    Http.createServer(requestListener).listen(8000);
    console.log("Server has began , please goSignUp:http://localhost:8000");
}
ServerMain();
//---------------------------------------------------------------------------------------------------------------------

//重新返回当前界面模块---------------------------------------------------------------------------------------------------
var EXTs = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".jpg": "image/jpeg"
};
function redirectToSignUp(response) 
{
    response.writeHead(302, {'Location': '/'});
    response.end();
}
function getFile(filePath, response) 
{
    var mime = EXTs[Path.extname(Path.basename(filePath))];
    if (mime && FileSystem.existsSync('.' + filePath)) {
        FileSystem.readFile('.' + filePath, function(err, contents) 
        {
            if (!err) 
            {
                response.writeHead(200, {'Content-type': mime});
                response.end(contents);
            } 
            else 
            {
                console.log(err);
            }
        });
    } 
    else 
    {
        redirectToSignUp(response);
    }
}
//---------------------------------------------------------------------------------------------------------------------


//插入新人信息的模块-----------------------------------------------------------------------------------------------------
function Student(error, username, id, tel, email) 
{
    this.error = error;
    this.username = username;
    this.id = id;
    this.tel = tel;
    this.email = email;
}
function parseStudentInfo(param) 
{
    return new Student(CheckError.check(param), param.username, param.id, param.tel, param.email);
}
//---------------------------------------------------------------------------------------------------------------------

//检查某个信息：姓名，学号，电话，邮箱是否已经存在-------------------------------------------------------------------------
function checkExist(student) 
{
    var exists = {},
        bundle = {};
    for (var k in student) 
    {
        if (student.hasOwnProperty(k) && k != 'error') 
        {
            exists[k + 'Exists'] = (DataSource.findStudentBy(k, student[k]) != null);
        }
    }
    bundle.exists = exists;
    bundle.hasExist = (exists.usernameExists || exists.idExists || exists.telExists || exists.emailExists);
    return bundle;
}
//--------------------------------------------------------------------------------------------------------------------
function retrievePlainText(pathName, encoding) 
{
    try 
    {
        if (encoding) 
        {
            return FileSystem.readFileSync('.' + pathName, encoding);
        } 
        else 
        {
            return FileSystem.readFileSync('.' + pathName);
        }
    } 
    catch (err) 
    {
        console.log(err);
        return '<html><body><p>Occur Error</p></body></html>';
    }
}


//用户注册界面和信息查看界面----------------------------------------------------------------------------------------------
function restrictPathName(p) 
{
    var rp = p;
    if (p == '/index.html') 
    {
        rp = '/';
    }
    return rp;
}
function goStudentInfo(request, response, student) 
{
    var html = retrievePlainText('/information.html', 'utf-8');
    for (var key in student) 
    {
        if (key != 'error' && student.hasOwnProperty(key)) 
        {
            html = html.replace('{' + key + '}', student[key]);
        }
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
}
function replaceError(html, err, exists) 
{
    var h = html;
    for (var key in err) 
    {
        if (err.hasOwnProperty(key) && key != 'code') 
        {
            h = h.replace('{' + key + '}', err[key] ? CheckError.ERR_STRs[key] : (exists && exists[key.substr(0, key.length - 3) + 'Exists'] ? CheckError.EXI_STRs[key] : ''));
        }
    }
    return h;
}
function goSignUp(request, response, student, exists) 
{
    var html = retrievePlainText('/signup.html', 'utf-8');
    if (student) 
    {
        for (var key in student) 
        {
            if (student.hasOwnProperty(key)) 
            {
                if (key != 'error') 
                {
                    html = html.replace('{' + key + '}', student[key]);
                } 
                else 
                {
                    html = replaceError(html, student['error'], exists);
                }
            }
        }
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
}
function requestListener(request, response) 
{
    var url = Url.parse(request.url, true) , pathname = restrictPathName(url.pathname) , student;
    if (pathname == '/') 
    {
        if (request.method == 'GET') 
        {
            console.log("method:GET");
            if (student = DataSource.findStudentBy('username', url.query.username)) 
            {
                goStudentInfo(request, response, student);
            } 
            else if (url.query.username == undefined) 
            {
                goSignUp(request, response);
            } 
            else 
            {
                response.writeHead(302, {'Location': '/'});
                response.end();
            }
        } 
        else if (request.method == 'POST') 
        {
            console.log("method:POST");
            var data = '';
            request.setEncoding('utf-8');
            request.addListener('data', function(chunk) {data += chunk;});
            request.addListener('end', function() 
            {
                student = parseStudentInfo(QueryString.parse(data));
                var existsBundle = checkExist(student);
                if (!student.error.code && !existsBundle.hasExist) 
                {
                    DataSource.addStudent(student);
                    response.writeHead(302, {'Location': '/?username=' + encodeURIComponent(student.username)});
                    response.end();
                } 
                else 
                {
                    goSignUp(request, response, student, existsBundle.exists);
                }
            });
        } 
        else 
        {
            redirectToSignUp(response);
        }
    } 
    else 
    {
        getFile(pathname, response);
    }
}
//-----------------------------------------------------------------------------------------------------------------------
