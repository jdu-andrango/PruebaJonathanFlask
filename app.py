from flask import Flask, send_file,jsonify, request
from psycopg2 import connect,extras

app= Flask(__name__)

host='localhost'
port=5432
database='flaskjonathanprueba'
user='postgres'
password='david'

def getConexion():
    conexion= connect(host=host,port=port,database=database,user=user,password=password)
    return conexion


@app.get('/')
def index():
    return send_file('static/index.html')

@app.get('/jonathan/autor')
def autor():
    conexion=getConexion()
    curSor=conexion.cursor(cursor_factory=extras.RealDictCursor)
    
    curSor.execute('SELECT * FROM autor')
    autor= curSor.fetchall()
    curSor.close()
    conexion.close()
    return jsonify(autor)

@app.post('/jonathan/autor')
def crearLibro():
    nuevoAutor= request.get_json()
    
    primernombre =nuevoAutor['primernombre']
    segundonombre =nuevoAutor ['segundonombre']
    apellido=nuevoAutor['apellido']
    direccion=nuevoAutor['direccion']
    nacionalidad=nuevoAutor['nacionalidad']
    editorial=nuevoAutor['editorial']
    
        
    conexion=getConexion()
    curSor=conexion.cursor(cursor_factory=extras.RealDictCursor)
    
    curSor.execute('INSERT INTO autor (primernombre, segundonombre, apellido, direccion, nacionalidad,editorial) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *',(primernombre, segundonombre, apellido, direccion, nacionalidad, editorial))
    newAutor= curSor.fetchone()
    conexion.commit()
    curSor.close()
    conexion.close()
    
    
    return jsonify(newAutor)


if __name__=='__main__':
    app.run(debug=True)