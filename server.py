import flask

app = flask.Flask(__name__)


@app.route('/', methods=['GET'])
def showindex():
    return flask.send_from_directory('', "index.html")

@app.route('/<path:filename>', methods=['GET'])
def valid_url(filename):
    if "privkey.pem" in filename or "server.py" in filename or "stonks/" in filename:
        return flask.abort(403)

    return flask.send_from_directory('', filename)

#app.run(host="0.0.0.0", port="443", ssl_context=('/etc/letsencrypt/live/smolcodes.com/fullchain.pem', '/etc/letsencrypt/live/smolcodes.com/privkey.pem'), threaded=True)
app.run(host="0.0.0.0", port="80")  # for testing

# to update
# scp -r "/Users/luke/Desktop/smolcodes" root@smolcodes.com:/
# don't forget to ssh to it and rerun server.py to make the changes appear

# run certbot renew on 2021-06-13
# brave rewards uses luke9801@icloud.com