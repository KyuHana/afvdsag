import hashlib
import hmac
import base64


class Signature:

    @staticmethod
    def generate(timestamp, method, uri, SECRET_KEY):
        message = "{}.{}.{}".format(timestamp, method, uri)
        hash = hmac.new(bytes(SECRET_KEY.encode("utf-8")),
                        bytes(message.encode("utf-8")), hashlib.sha256)

        hash.hexdigest()
        return base64.b64encode(hash.digest())
