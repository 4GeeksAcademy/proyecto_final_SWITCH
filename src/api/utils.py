from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a style='color:yellow; font-size: 18px' href='" + y + "'>" + y + " </a></li>" for y in links])
    return """
        <body style="text-align: center; background: black; color: white">
        <div>
        <img style="max-height: 250px" src="https://cdn-icons-png.flaticon.com/512/6066/6066818.png" />
        <h1 style="color: yellow">SWITCH API</h1>
        <p style="font-size: 18px">API HOST: <script>document.write('<input style="padding: 8px; width: 400px" type="text" value="'+window.location.href+'" />');</script></p>
        <p style="font-size: 18px">Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank" style="color:white">Quick Start</a></p>
        <p style="font-size: 18px">The endpoints: </p>
        <ul style="text-align: center; list-style-type: none; font-size: 18px; padding: 0">"""+links_html+"</ul></div>"
